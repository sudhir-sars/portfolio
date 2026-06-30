import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { Background } from "@/components/background/Background";
import { Navigation } from "@/components/navigation/Navigation";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "README",
  description: "Start from the beginning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        inter.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <body className="min-h-screen  ">
        <ConvexClientProvider>
          <ThemeProvider forcedTheme="dark" enableSystem>
            <Background />
            <Navigation />
            {children}
            <Toaster position="bottom-right" />
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
