import { Link } from "react-router-dom";
import { partnerUniversities } from "@/data/partnerUniversities";

// A handful of names from the partner list, shown as text so nothing depends
// on third-party logo hosting.
const featured = partnerUniversities.slice(0, 6);

export default function Partners() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y bg-muted/30"
    >
      <div className="container py-10">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2
            id="partners-heading"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
          >
            Transfer partners include
          </h2>
          <Link to="/transfer" className="link text-sm">
            See all {partnerUniversities.length} partners
          </Link>
        </div>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-card px-4 py-3 text-sm ring-1 ring-border"
            >
              <span className="font-medium">{u.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {u.location}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
