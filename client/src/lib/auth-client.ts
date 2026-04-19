import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

// Explicitly define the types for the session to include custom fields
export type Session = typeof authClient.$Infer.Session & {
  user: {
    role: string;
    status: string;
    needPasswordChange: boolean;
  };
};

export const { signIn, signUp, signOut, useSession } = authClient;