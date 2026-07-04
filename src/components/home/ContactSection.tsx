"use client";

import { useAction } from "convex/react";
import { useState } from "react";

import { toast } from "sonner";
import {
  ArrowRightIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Section } from "./Section";

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
    Icon: TwitterIcon,
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
    <Section
      id="contact"
      label="Contact"
      title="Get in touch"
      lead="For roles, systems work, or anything worth building — send a note, it lands straight in my inbox."
    >
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <ul className="flex flex-col gap-4">
          {CONTACTS.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group inline-flex items-center gap-3 text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <Icon size={18} />
                <span className="text-sm">{value}</span>
              </a>
            </li>
          ))}
        </ul>

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
          />

          <Textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What would you like to talk about?"
            disabled={pending}
            required
            className="h-40 overflow-hidden"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity duration-150 hover:opacity-85 disabled:pointer-events-none disabled:opacity-60"
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
    </Section>
  );
}
