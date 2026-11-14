import { Link } from "react-router-dom";
import { contacts } from "@/data/sample";

const columns = [
  {
    title: "Academics",
    links: [
      { to: "/academics", label: "Programs" },
      { to: "/faculty", label: "Faculty" },
      { to: "/events", label: "Events" },
      { to: "/enigma", label: "ENIGMA club" },
    ],
  },
  {
    title: "Research",
    links: [
      { to: "/research", label: "Research & Medicine" },
      { to: "/impact", label: "Impact & Outreach" },
      { to: "/news", label: "News" },
      { to: "/student-life", label: "Student Life" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { to: "/admissions-aid", label: "Admissions & Aid" },
      { to: "/financial-aid", label: "Financial Aid" },
      { to: "/medical-aid", label: "Medical Aid" },
      { to: "/transfer", label: "Transfer (2+2)" },
      { to: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t bg-muted/30">
      <div className="container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md text-lg font-extrabold tracking-tight"
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-md bg-gradient-to-br from-primary to-brand-600 text-sm font-black text-white"
              aria-hidden
            >
              i
            </span>
            ICAS
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">
            International Center for Applied Science. Advancing knowledge for
            global good.
          </p>
          <address className="mt-4 grid gap-1 text-sm not-italic text-muted-foreground">
            <a
              className="hover:text-foreground"
              href={`mailto:${contacts.email}`}
            >
              {contacts.email}
            </a>
            <a
              className="hover:text-foreground"
              href={`tel:${contacts.phone.replace(/\s/g, "")}`}
            >
              {contacts.phone}
            </a>
          </address>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-labelledby={`footer-${col.title}`}>
            <h2
              id={`footer-${col.title}`}
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              {col.title}
            </h2>
            <ul className="mt-3 grid gap-1 text-sm">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="inline-flex min-h-8 items-center rounded-sm transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} ICAS. All rights reserved.</span>
          <span>
            Demo site: content is sample data.{" "}
            <Link to="/portal" className="underline-offset-4 hover:underline">
              Student portal
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
