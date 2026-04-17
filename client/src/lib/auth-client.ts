import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
   baseURL: "http://localhost:5000", // অবশ্যই FRONTEND থেকে accessable URL
});

export const { signIn, signUp, signOut, useSession } = authClient;
// console.log("Auth Client Initialized:", authClient);