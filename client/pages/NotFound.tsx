import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import SEO from "@/components/SEO";

const suggestions = [
  { to: "/academics", label: "Academics", hint: "Programs and curricula" },
  { to: "/admissions-aid", label: "Admissions & Aid", hint: "How to apply" },
  { to: "/transfer", label: "Transfer (2+2)", hint: "Partner universities" },
  { to: "/contact", label: "Contact", hint: "Ask the team" },
];

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="container flex min-h-[65vh] items-center justify-center py-16">
      <SEO
        title="Page not found — ICAS"
        description="The requested page does not exist."
      />
      <div className="w-full max-w-xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
          <Compass className="h-7 w-7" aria-hidden />
        </span>
        <p className="mt-6 text-sm font-semibold text-primary">Error 404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find{" "}
          <code className="break-all rounded bg-muted px-1.5 py-0.5 text-sm">
            {pathname}
          </code>
          . It may have moved, or the link may be mistyped.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to home
        </Link>
        <nav aria-label="Popular pages" className="mt-10 text-left">
          <h2 className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Or try one of these
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {suggestions.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="card-surface card-interactive block p-4"
                >
                  <span className="font-semibold">{s.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {s.hint}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
