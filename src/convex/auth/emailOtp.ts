/**
 * Email OTP provider configuration.
 *
 * The frontend auth flow calls `signIn("email-otp", formData)` twice:
 *   1. with only `email` — we generate a 6-digit code and send it
 *   2. with `email` + `code` — the code is verified and the user signed in
 *
 * In this sandbox there is no SMTP/Resend credential, so the code is logged to
 * the server console. If a VLY integration key is configured, the code is also
 * delivered through the VLY email gateway (see /integrations.md).
 */
import { Email } from "@convex-dev/auth/providers/Email";

/** 6-digit numeric verification code. */
async function generateVerificationCode(): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  return code;
}

async function sendVerificationRequest({
  identifier,
  token,
  expires,
}: {
  identifier: string;
  token: string;
  expires: Date;
}) {
  // Always surface the code server-side so the flow is usable in dev.
  console.log(
    `[email-otp] Verification code for ${identifier}: ${token} (expires ${expires.toISOString()})`,
  );

  // Deliver through the VLY email gateway when configured.
  const integrationKey = process.env.VLY_INTEGRATION_KEY;
  const baseUrl =
    process.env.VLY_INTEGRATION_BASE_URL ??
    "https://integrations.freebuff.com/";
  if (!integrationKey) {
    return;
  }
  try {
    await fetch(`${baseUrl}v1/email/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${integrationKey}`,
      },
      body: JSON.stringify({
        to: identifier,
        subject: "Your verification code",
        html: `<p>Your verification code is <strong>${token}</strong>.</p><p>It expires in 5 minutes.</p>`,
        text: `Your verification code is ${token}. It expires in 5 minutes.`,
      }),
    });
  } catch (error) {
    console.error("[email-otp] Failed to send email via VLY:", error);
  }
}

export const EmailOTP = Email({
  id: "email-otp",
  name: "Email OTP",
  maxAge: 5 * 60, // 5 minutes
  generateVerificationToken: generateVerificationCode,
  sendVerificationRequest,
});
