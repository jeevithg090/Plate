import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
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
        className={`${transparent ? "text-white/90" : "text-muted-foreground"} hidden border-b/0 text-xs md:block`}
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
          className={`flex items-center gap-2 font-extrabold tracking-tight ${transparent ? "text-white" : "text-primary"}`}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F766318eacea44b40bcc70d9d860cc3ef%2Ff91793dcf37543a2b5a1a15981fd005e?format=webp&width=80"
            alt="ICAS logo"
            className="h-7 w-7 rounded-sm object-contain"
            loading="eager"
            width="28"
            height="28"
          />
          ICAS
        </Link>
        <nav
          aria-label="Main"
          className="hidden items-center gap-5 text-sm font-medium md:flex"
        >
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-md px-2 py-1 transition-colors ${
                  transparent
                    ? `text-white/90 hover:text-white ${isActive ? "underline underline-offset-4" : ""}`
                    : `hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className={
              transparent
                ? "hidden rounded-md border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white shadow-soft transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:inline-flex"
                : "hidden rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:inline-flex"
            }
          >
            Get in touch
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className={`inline-flex h-10 w-10 items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden ${
                transparent ? "text-white hover:bg-white/10" : "hover:bg-muted"
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle>ICAS</SheetTitle>
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
                      `rounded-md px-3 py-2 transition-colors hover:bg-muted ${
                        isActive ? "text-primary" : "text-foreground"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
                <Link
                  to="/contact"
                  className="mt-4 rounded-md bg-primary px-3 py-2 text-center font-semibold text-primary-foreground"
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
