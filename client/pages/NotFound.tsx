import { Link, useLocation } from "react-router-dom";
import SEO from "@/components/SEO";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="container flex min-h-[60vh] items-center justify-center py-16">
      <SEO
        title="Page not found — ICAS"
        description="The requested page does not exist."
      />
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find <code className="break-all">{pathname}</code>.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
