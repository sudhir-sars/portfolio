"use client";

import { useAction } from "convex/react";
import { type ReactNode, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightIcon, ContactIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactDialog({ children }: { children: ReactNode }) {
  const send = useAction(api.contact.send);

  const [open, setOpen] = useState(false);
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
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="min-w-xl border border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="inline-flex items-center gap-2 text-white/90">
            <ContactIcon size={18} />
            <span>Get in touch</span>
          </DialogTitle>
        </DialogHeader>

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
            className="px-4 text-white/80 placeholder:-translate-y-px placeholder:text-xs placeholder:text-white/80"
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
            className="px-4 text-white/80 placeholder:-translate-y-px placeholder:text-xs placeholder:text-white/80"
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

          <DialogFooter>
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm tracking-wide text-white/60 transition-all duration-150 hover:bg-white/10 hover:text-white active:scale-90 disabled:pointer-events-none disabled:opacity-60"
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
