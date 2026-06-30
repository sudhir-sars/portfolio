"use node";

import { v } from "convex/values";
import { Resend } from "resend";
import { internal } from "./_generated/api";
import { action } from "./_generated/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const send = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const name = args.name.trim();
    const email = args.email.trim();
    const message = args.message.trim();

    if (name.length < 2) {
      throw new Error("Please enter your name.");
    }
    if (!EMAIL_RE.test(email)) {
      throw new Error("Please enter a valid email address.");
    }
    if (message.length < 10) {
      throw new Error("Please write a slightly longer message.");
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) {
      throw new Error(
        "Contact is not configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL in the Convex deployment.",
      );
    }
    const from = "Portfolio Contact <contact@sudhirx.dev>";

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6">
          <p style="margin:0 0 12px"><strong>From:</strong> ${escapeHtml(name)}
            &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;</p>
          <p style="margin:0 0 4px"><strong>Message:</strong></p>
          <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
        </div>`,
    });

    if (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }

    await ctx.runMutation(internal.messages.log, { name, email, message });

    return { ok: true as const };
  },
});
