"use client";

import { useAction } from "convex/react";
import { useState } from "react";

import { toast } from "sonner";
import {
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
} from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { ChapterSheet } from "../../ChapterSheet";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACTS = [
  {
    label: "Email",
    value: "sudhir.sars@gmail.com",
    href: "mailto:sudhir.sars@gmail.com",
    Icon: MailIcon,
  },
  {
    label: "GitHub",
    value: "sudhir-sars",
    href: "https://github.com/sudhir-sars",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: "sudhir-sars",
    href: "https://www.linkedin.com/in/sudhir-sars",
    Icon: LinkedinIcon,
  },
  {
    label: "X",
    value: "@sudhir_sars",
    href: "https://x.com/sudhir_sars",
    Icon: GithubIcon,
  },
] as const;
export function ContactSection() {
  const send = useAction(api.contact.send);

  const [pending, setPending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;

    if (name.trim().length < 2) {
      toast.error("Please enter your name.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (message.trim().length < 10) {
      toast.error("Please write a slightly longer message.");
      return;
    }

    setPending(true);
    try {
      await send({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      toast.success("Message sent, thanks for reaching out.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <ChapterSheet id="contact" number="06" name="Contact">
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col">
          <h2 className="font-semibold text-2xl text-white tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mt-5 max-w-md text-base text-white/90 leading-relaxed">
            Have a problem worth building for, a role, or just want to talk
            systems and AI? Send a note, it lands straight in my inbox.
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {CONTACTS.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group inline-flex items-center gap-3 text-white/60 transition-colors duration-150 hover:text-white"
                >
                  <Icon size={18} />

                  <span className="flex flex-col leading-tight">
                    <span className="text-sm">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="contact-name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            disabled={pending}
            required
            className="px-4 h-9 text-white/80 placeholder:-translate-y-px placeholder:text-xs placeholder:text-white/80"
          />

          <Input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            disabled={pending}
            required
            className="px-4 h-9 text-white/80 placeholder:-translate-y-px placeholder:text-xs placeholder:text-white/80"
          />

          <Textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to talk about?"
            disabled={pending}
            required
            className="h-40 overflow-hidden p-4 text-white/80 placeholder:text-xs placeholder:text-white/80"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/60 tracking-wide transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-60"
            >
              {pending ? (
                <>
                  <span>Sending…</span>
                  <Spinner />
                </>
              ) : (
                <>
                  <span>Send message</span>
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </ChapterSheet>
  );
}
