import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig {
  APP_NAME?: string;
  APP_URL: string;
  DATABASE_URL: string;
  FRONTEND_URL: string;

  ACCESS_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES_IN: string;
  REFRESH_TOKEN_SECRET: string;
  REFRESH_TOKEN_EXPIRES_IN: string;

  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  GOOGLE_CALLBACK_URL: string;

  GMAIL_CLIENT_ID?: string;
  GMAIL_CLIENT_SECRET?: string;
  GMAIL_REFRESH_TOKEN?: string;
  GMAIL_USER?: string;
  GMAIL_FROM?: string;

  EMAIL_SENDER: {
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_FROM: string;
  };

  SUPER_ADMIN_EMAIL: string;
  ADMIN_NOTIFICATION_EMAILS: string;
  NODE_ENV: string;
  PORT: string;

  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;

  TURNSTILE_SECRET_KEY: string;
}

const loadEnvVars = (): EnvConfig => {
  const requiredEnvVars = [
    "APP_URL",
    "DATABASE_URL",
    "FRONTEND_URL",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRES_IN",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRES_IN",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "GOOGLE_CALLBACK_URL",
    "GMAIL_CLIENT_ID",
    "GMAIL_CLIENT_SECRET",
    "GMAIL_REFRESH_TOKEN",
    "GMAIL_USER",
    "GMAIL_FROM",
    "EMAIL_SENDER_SMTP_USER",
    "EMAIL_SENDER_SMTP_PASS",
    "EMAIL_SENDER_SMTP_HOST",
    "EMAIL_SENDER_SMTP_PORT",
    "EMAIL_SENDER_SMTP_FROM", "SUPER_ADMIN_EMAIL",
    "ADMIN_NOTIFICATION_EMAILS",
    "NODE_ENV",
    "PORT",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
      "TURNSTILE_SECRET_KEY",
  ];

  // Validate required environment variables
  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(
        `❌ Environment variable ${varName} is required but not set in .env file.`
      );
    }
  });

  return {
    APP_NAME: process.env.APP_NAME ?? "Petronick Holdings",
    APP_URL: process.env.APP_URL!,
    DATABASE_URL: process.env.DATABASE_URL!,
    FRONTEND_URL: process.env.FRONTEND_URL!,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET!,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN!,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET!,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN!,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL!,

    GMAIL_CLIENT_ID: process.env.GMAIL_CLIENT_ID,
GMAIL_CLIENT_SECRET: process.env.GMAIL_CLIENT_SECRET,
GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
GMAIL_USER: process.env.GMAIL_USER,
GMAIL_FROM: process.env.GMAIL_FROM,

    EMAIL_SENDER: {
      SMTP_USER: process.env.EMAIL_SENDER_SMTP_USER!,
      SMTP_PASS: process.env.EMAIL_SENDER_SMTP_PASS!,
      SMTP_HOST: process.env.EMAIL_SENDER_SMTP_HOST!,
      SMTP_PORT: process.env.EMAIL_SENDER_SMTP_PORT!,
      SMTP_FROM: process.env.EMAIL_SENDER_SMTP_FROM!,
    },

    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL!,
    ADMIN_NOTIFICATION_EMAILS: process.env.ADMIN_NOTIFICATION_EMAILS!,
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!,

    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME!,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY!,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET!,

    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY!,
  };
};

export const envVars = loadEnvVars();