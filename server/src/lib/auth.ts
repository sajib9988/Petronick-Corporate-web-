// server/src/lib/auth.ts

import { betterAuth } from "better-auth";
import { bearer, emailOTP } from "better-auth/plugins";
import { envVars } from "../config/env";
import { sendEmail } from "../shared/utils/email";
import { prisma } from "../database/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { Role, UserStatus } from "../../generated/prisma-client";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  baseURL: envVars.BETTER_AUTH_URL,
  secret: envVars.BETTER_AUTH_SECRET,

  trustedOrigins: [
    envVars.APP_URL,
    envVars.FRONTEND_URL,
    envVars.BETTER_AUTH_URL,
    "http://localhost:3000",
    "http://localhost:5000",
  ],

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      prompt:"select_account consent",
      accessType: "offline",
      clientId:"1046307807117-2kbmtvc8i07esgen7opa5cepq5tbghb5.apps.googleusercontent.com",
      clientSecret:"GOjzCSPX-tnpcWhjeXSjOOLMpgvOHwyGkUBh6"
    },
  },

  emailVerification: {
    sendOnSignUp: false,
    sendOnSignIn: false,
    autoSignInAfterVerification: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: Role.USER,
      },
      status: {
        type: "string",
        required: true,
        defaultValue: UserStatus.ACTIVE,
      },
      needPasswordChange: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      isDeleted: {
        type: "boolean",
        required: true,
        defaultValue: false,
      },
      deletedAt: {
        type: "date",
        required: false,
        defaultValue: null,
      },
    },
  },

  plugins: [
    bearer(),
    emailOTP({
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user) return;
          if (!user.emailVerified) {
            sendEmail({
              to: email,
              subject: "Verify your email",
              templateName: "otp",
              templateData: {
                userName: user.name,
                appName: envVars.APP_NAME as string,
                otp,
              },
            });
          }
        } else if (type === "forget-password") {
          const user = await prisma.user.findUnique({ where: { email } });
          if (user) {
            sendEmail({
              to: email,
              subject: "Password Reset OTP",
              templateName: "otp",
              templateData: {
                userName: user.name,
                appName: envVars.APP_NAME as string,
                otp,
              },
            });
          }
        }
      },
      expiresIn: 5 * 60,
      otpLength: 6,
    }),
  ],

  session: {
    expiresIn: 60 * 60 * 24,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24,
    },
  },

  redirectURLs: {
    signIn: `${envVars.FRONTEND_URL}/`,
    signOut: `${envVars.FRONTEND_URL}/login`,
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    cookies: {
      state: {
        attributes: {
          sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          path: "/",
        },
      },
      sessionToken: {
        attributes: {
          sameSite: process.env.NODE_ENV === "production" ? "lax" : "lax",
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          path: "/",
        },
      },
    },
  },
});