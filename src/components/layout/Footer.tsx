const LINKS = [
  { label: "GitHub", href: "https://github.com/sudhir-sars" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sudhir-sars" },
  { label: "X", href: "https://x.com/sudhir_sars" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-10 md:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sudhir Saraswat
        </p>

        <ul className="flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
