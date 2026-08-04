import nodemailer from "nodemailer";
import ejs from "ejs";
import status from "http-status";
import path from "path";
import { envVars } from "../../config/env.js";
import { AppError } from "../errors/app-error.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: envVars.GMAIL_USER,
    clientId: envVars.GMAIL_CLIENT_ID,
    clientSecret: envVars.GMAIL_CLIENT_SECRET,
    refreshToken: envVars.GMAIL_REFRESH_TOKEN,
  },
});

// Verify transporter on startup
transporter
  .verify()
  .then(() => console.log("✅ Email transporter verified"))
  .catch((err) => console.error("❌ Email transporter error:", err.message));

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, string | number | boolean | object>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  subject,
  templateData,
  templateName,
  to,
  attachments,
}: SendEmailOptions): Promise<void> => {
  try {
    // Validate recipient
    if (!to || typeof to !== "string" || !to.includes("@")) {
      throw new Error(`Invalid recipient email: ${to}`);
    }

    const templatePath = path.resolve(
      process.cwd(),
      `src/templates/${templateName}.ejs`
    );

    const td = templateData as Record<string, unknown>;
    const expiresVal =
      td && Object.prototype.hasOwnProperty.call(td, "expiresInMinutes")
        ? td["expiresInMinutes"]
        : undefined;
    const expiresInMinutes = typeof expiresVal === "number" ? expiresVal : 5;

    const templateDataWithDefaults: Record<string, unknown> = {
      appName: envVars.APP_NAME ?? "Your App",
      supportEmail: envVars.SUPER_ADMIN_EMAIL ?? "support@example.com",
      year: new Date().getFullYear(),
      expiresInMinutes,
      ...td,
    };

    const html = await ejs.renderFile(templatePath, templateDataWithDefaults);

    const info = await transporter.sendMail({
      from: `"${envVars.APP_NAME || "Your App"}" <${envVars.GMAIL_FROM}>`,
      to,
      subject,
      html,
      attachments: attachments?.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
        contentType: attachment.contentType,
      })),
    });

    console.log(`✅ Email sent to ${to} | MessageId: ${info.messageId}`);
  } catch (error: any) {
    console.error(`❌ Failed to send email to ${to}:`, error.message);
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      `Failed to send email to ${to}: ${error.message}`
    );
  }
};

