"use client";

import { useMutation } from "convex/react";
import Link from "next/link";
import { useEffect } from "react";

import {
  CloseIcon,
  ContactIcon,
  type IconComponent,
  MenuIcon,
  ProjectIcon,
  ResumeIcon,
  WriteIcon,
} from "@/components/ui/icons";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";

const SECTIONS: { label: string; href: string; icon: IconComponent }[] = [
  {
    label: "Work",
    href: "/#projects",
    icon: ProjectIcon,
  },
  {
    label: "Writing",
    href: "/#writing",
    icon: WriteIcon,
  },
  {
    label: "Resume",
    href: "/#resume",
    icon: ResumeIcon,
  },
  {
    label: "Contact",
    href: "/#contact",
    icon: ContactIcon,
  },
] as const;

export function Navigation() {
  const increment = useMutation(api.views.increment);

  useEffect(() => {
    void increment();
  }, [increment]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <nav className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6 md:px-8">
        <Link
          href="/#top"
          className="text-sm font-semibold tracking-tight text-foreground transition-colors duration-150 hover:text-foreground/70"
        >
          Sudhir Saraswat
        </Link>

        {/* Desktop: quiet text links */}
        <ul className="hidden items-center gap-8 sm:flex">
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {section.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile: menu button + solid slide-over */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:text-foreground sm:hidden"
            >
              <MenuIcon className="h-4 w-4" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-border bg-background text-foreground shadow-none"
          >
            <SheetClose asChild>
              <button
                type="button"
                aria-label="Close navigation"
                className="absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                <CloseIcon className="h-4 w-4" />
              </button>
            </SheetClose>

            <SheetHeader>
              <SheetTitle className="text-sm font-semibold tracking-tight">
                Sudhir Saraswat
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-1 px-3 pb-6">
              {SECTIONS.map((section) => {
                const Icon = section.icon;
                return (
                  <SheetClose asChild key={section.href}>
                    <Link
                      href={section.href}
                      className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors duration-150 hover:bg-secondary hover:text-foreground"
                    >
                      <Icon className="h-4 w-4" />
                      {section.label}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
