import { Link } from "@tanstack/react-router";
import { Menu, Scale, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNexoStore } from "@/lib/nexo-store";
import { cn } from "@/lib/utils";

const links = [
  { label: "Explore", to: "/explore", search: { q: "", type: "all" } },
  { label: "Schools", to: "/explore", search: { q: "", type: "School" } },
  { label: "Colleges", to: "/explore", search: { q: "", type: "College" } },
  { label: "Universities", to: "/explore", search: { q: "", type: "University" } },
  { label: "Compare", to: "/compare", search: {} },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { compare } = useNexoStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <nav className="container-nexo flex h-16 items-center justify-between gap-6" aria-label="Main">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-lg font-semibold tracking-[0.28em]">NEXO</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                search={l.search as never}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                activeOptions={{ exact: false }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="ghost" size="icon" aria-label="Search institutions">
            <Link to="/explore" search={{ q: "", type: "all" }}>
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link to="/compare">
              <Scale className="h-4 w-4" />
              {compare.length > 0 && (
                <span className="rounded-full bg-surface-elevated px-1.5 text-xs tabular-nums">
                  {compare.length}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="sm">
            Login
          </Button>
          <Button size="sm">Sign Up</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85vw] max-w-sm border-border bg-surface">
            <SheetTitle className="font-display tracking-[0.28em]">NEXO</SheetTitle>
            <div className="mt-8 flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  search={l.search as never}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline">Login</Button>
                <Button>Sign Up</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
