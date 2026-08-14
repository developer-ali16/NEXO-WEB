import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Twitter } from "lucide-react";

const groups = [
  {
    title: "Explore",
    items: [
      { label: "All institutions", to: "/explore", search: { q: "", type: "all" } },
      { label: "Schools", to: "/explore", search: { q: "", type: "School" } },
      { label: "Colleges", to: "/explore", search: { q: "", type: "College" } },
      { label: "Universities", to: "/explore", search: { q: "", type: "University" } },
    ],
  },
  {
    title: "Platform",
    items: [
      { label: "Compare", to: "/compare", search: {} },
      { label: "About", to: "/", search: {} },
      { label: "Contact", to: "/", search: {} },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", to: "/", search: {} },
      { label: "Terms", to: "/", search: {} },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-nexo grid gap-12 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <span className="font-display text-lg font-semibold tracking-[0.28em]">NEXO</span>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Discover. Compare. Choose. A calm way to explore schools, colleges and universities.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: Twitter, label: "Twitter" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Github, label: "GitHub" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="eyebrow">{g.title}</h3>
            <ul className="mt-4 space-y-3">
              {g.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    search={item.search as never}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-nexo flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} NEXO. All rights reserved.</p>
          <p>Discover. Compare. Choose.</p>
        </div>
      </div>
    </footer>
  );
}
