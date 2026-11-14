import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import ThemeToggle from "@/components/theme/ThemeToggle";
import SmartImage from "@/components/ui/smart-image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const nav = [
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions-aid", label: "Admissions/Aid" },
  { to: "/enigma", label: "Enigma" },
  { to: "/student-life", label: "Student Life" },
  { to: "/contact", label: "Contact" },
  { to: "/transfer", label: "Transfer" },
  { to: "/portal", label: "Portal" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={
        transparent
          ? "absolute inset-x-0 top-0 z-40 w-full border-transparent bg-transparent text-white"
          : "sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      }
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      {/* Topbar */}
      <div
        className={`${transparent ? "text-white/90" : "text-muted-foreground"} hidden text-xs lg:block`}
      >
        <div className="container flex h-9 items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="mailto:hello@icas.edu" className="hover:underline">
              hello@icas.edu
            </a>
            <a href="tel:+918012345678" className="hover:underline">
              +91 80 1234 5678
            </a>
          </div>
        </div>
      </div>

      <div className="container flex h-16 items-center justify-between gap-6">
        <Link
          to="/"
          aria-label="ICAS home"
          className={`flex shrink-0 items-center gap-2 rounded-md font-extrabold tracking-tight ${transparent ? "text-white" : "text-foreground"}`}
        >
          <SmartImage
            src="https://cdn.builder.io/api/v1/image/assets%2F766318eacea44b40bcc70d9d860cc3ef%2Ff91793dcf37543a2b5a1a15981fd005e?format=webp&width=80"
            alt=""
            className="h-8 w-8 rounded-md object-contain"
            loading="eager"
            width="32"
            height="32"
            fallback={
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary to-brand-600 text-sm font-black text-white shadow-sm"
              >
                i
              </span>
            }
          />
          <span className="text-lg">ICAS</span>
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center gap-1 text-sm font-medium lg:flex"
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 transition-colors ${
                  transparent
                    ? `hover:bg-white/10 hover:text-white ${isActive ? "bg-white/15 text-white" : "text-white/90"}`
                    : `hover:bg-muted hover:text-foreground ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"}`
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle
            className={
              transparent
                ? "text-white hover:bg-white/10 focus-visible:ring-white/70"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }
          />
          <Link
            to="/contact"
            className={
              transparent
                ? "ml-1 hidden h-10 items-center rounded-md border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:inline-flex"
                : "ml-1 hidden h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
            }
          >
            Get in touch
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden ${
                transparent ? "text-white hover:bg-white/10" : "hover:bg-muted"
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetTitle className="text-left">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation
              </SheetDescription>
              <nav
                aria-label="Mobile"
                className="mt-6 grid gap-1 text-base font-medium"
              >
                {nav.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    className={({ isActive }) =>
                      `flex min-h-11 items-center rounded-md px-3 transition-colors hover:bg-muted ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-foreground"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-4 flex min-h-11 items-center justify-center rounded-md bg-primary px-3 font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Get in touch
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
