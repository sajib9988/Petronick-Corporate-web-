import { envVars } from "../../config/env.js";
import { AppError } from "../errors/app-error.js";
import status from "http-status";

export const verifyTurnstile = async (token: string, ip?: string) => {
  if (!token) {
    throw new AppError(status.BAD_REQUEST, "Turnstile verification token missing");
  }

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: envVars.TURNSTILE_SECRET_KEY,
      response: token,
      ...(ip && { remoteip: ip }),
    }),
  });

  const data = await res.json();

  if (!data.success) {
    throw new AppError(status.BAD_REQUEST, "Turnstile verification failed");
  }
};