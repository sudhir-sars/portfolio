// Import global styles and fonts
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-foreground antialiased">
        <main className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-brand">
            404
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Page not found
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The page you are looking for does not exist.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-secondary"
          >
            Back to home
          </a>
        </main>
      </body>
    </html>
  );
}
