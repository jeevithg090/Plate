import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import ProgramCarousel from "@/components/sections/ProgramCarousel";
import Partners from "@/components/sections/Partners";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import SmartImage from "@/components/ui/smart-image";
import { ArrowRight } from "lucide-react";

const stats = [
  { label: "Years of Impact", value: "58" },
  { label: "Active Research Labs", value: "24" },
  { label: "Peer‑Reviewed Publications", value: "1,200+" },
  { label: "Countries Represented", value: "72" },
];

const events = [
  { date: "Nov 18", title: "Global Health Symposium", status: "current" },
  { date: "Dec 02", title: "Materials Science Colloquium", status: "upcoming" },
  { date: "Dec 12", title: "AI in Medicine Roundtable", status: "upcoming" },
];

const news = [
  {
    title: "ICAS researchers publish breakthrough on wearable diagnostics",
    clip: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    title: "Alumni story: From ICAS to leading vaccine delivery tech",
    clip: "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
];

export default function Index() {
  return (
    <main className="min-h-screen">
      <SEO
        title="ICAS — International Center for Applied Science"
        description="A modern, accessible, and inspiring institute advancing research, medicine, and education worldwide."
      />

      {/* Hero with campus background */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-700 to-primary">
        {/* Decorative photo; the branded gradient shows if it can't load. */}
        <SmartImage
          src="https://images.pexels.com/photos/7972558/pexels-photo-7972558.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          fallback={null}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/25"
        />
        <div className="relative">
          <div className="container pb-24 pt-32 md:pb-32 md:pt-40">
            <div className="max-w-3xl text-white">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/25">
                International Center for Applied Science
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Advancing knowledge. Improving lives.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
                ICAS, a MAHE constituent, offers a 2+2 engineering pathway — 2
                years in Manipal and 2 years abroad — across Computer Science,
                Aeronautical, and Mechatronics.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/academics"
                  className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 motion-reduce:hover:translate-y-0"
                >
                  Explore Academics
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  to="/enigma"
                  className="inline-flex h-11 items-center rounded-md border border-white/40 bg-white/10 px-5 font-semibold text-white backdrop-blur transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Meet ENIGMA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section
        aria-label="Engineering disciplines"
        className="container relative -mt-6 grid gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {[
          {
            title: "Computer Science & Engineering",
            img: "https://images.pexels.com/photos/1181673/pexels-photo-1181673.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Aeronautical Engineering",
            img: "https://images.pexels.com/photos/256219/pexels-photo-256219.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Mechatronics",
            img: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Civil Engineering",
            img: "https://images.pexels.com/photos/1469044/pexels-photo-1469044.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Chemical Engineering",
            img: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
          {
            title: "Electrical & Electronics Engineering",
            img: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=800",
          },
        ].map((c) => (
          <Link
            key={c.title}
            to="/academics"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-brand-800 to-brand-500 shadow-sm ring-1 ring-border transition hover:shadow-md"
          >
            <SmartImage
              src={c.img}
              alt=""
              className="h-40 w-full object-cover transition duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              fallback={<div className="h-40 w-full" aria-hidden />}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4">
              <span className="text-base font-semibold text-white drop-shadow">
                {c.title}
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-white/80 transition group-hover:translate-x-0.5"
                aria-hidden
              />
            </div>
          </Link>
        ))}
      </section>

      {/* Featured Programs */}
      <ProgramCarousel />

      {/* Highlights */}
      <section className="border-y bg-background/50">
        <div className="container grid gap-10 py-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              A legacy of breakthroughs
            </h2>
            <p className="mt-3 text-muted-foreground">
              Since 1967, ICAS has pioneered applied research from the lab to
              the clinic. Explore our timeline, faculty, and global
              partnerships.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg bg-card p-4 text-center shadow-sm ring-1 ring-border"
                >
                  <div className="text-2xl font-bold text-primary">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to="/about"
                className="text-primary underline-offset-4 hover:underline"
              >
                About ICAS: timeline & research stats
              </Link>
            </div>
          </div>

          {/* Research metrics */}
          <div className="rounded-xl bg-gradient-to-br from-brand-600/10 to-secondary/10 p-6 ring-1 ring-border">
            <h3 className="text-lg font-semibold">
              Research & Medicine metrics
            </h3>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm md:grid-cols-3">
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Clinical trials</dt>
                <dd className="mt-1 text-xl font-bold">36 active</dd>
              </div>
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Translational grants</dt>
                <dd className="mt-1 text-xl font-bold">$58M</dd>
              </div>
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Open datasets</dt>
                <dd className="mt-1 text-xl font-bold">48</dd>
              </div>
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Patents filed</dt>
                <dd className="mt-1 text-xl font-bold">92</dd>
              </div>
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Case studies</dt>
                <dd className="mt-1 text-xl font-bold">120+</dd>
              </div>
              <div className="rounded-lg bg-card p-4 ring-1 ring-border">
                <dt className="text-muted-foreground">Global partners</dt>
                <dd className="mt-1 text-xl font-bold">150</dd>
              </div>
            </dl>
            <div className="mt-4">
              <Link
                to="/research"
                className="text-primary underline-offset-4 hover:underline"
              >
                See case studies and clinical impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <Partners />

      {/* Enigma student club */}
      <section className="container py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">
            Enigma — Student Club
          </h2>
          <Link
            to="/enigma"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Explore Enigma
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Development", blurb: "Web, mobile, cloud & hackathons." },
            { name: "Robotics", blurb: "Mechanisms, electronics, control." },
            { name: "Research", blurb: "Papers, reviews, reproducibility." },
          ].map((d) => (
            <li
              key={d.name}
              className="rounded-lg bg-card p-4 ring-1 ring-border"
            >
              <div className="text-lg font-semibold">{d.name}</div>
              <p className="mt-1 text-sm text-muted-foreground">{d.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Student Life feed preview */}
      <section className="container py-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Student Life</h2>
          <Link
            to="/student-life"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View private feed
          </Link>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="rounded-lg bg-card p-4 shadow-sm ring-1 ring-border"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                <div>
                  <p className="text-sm font-medium">
                    Student @{""}
                    {100 + i}
                  </p>
                  <p className="text-xs text-muted-foreground">2h ago</p>
                </div>
              </div>
              <p className="mt-3 text-sm">
                Lab showcase and community highlights from the ICAS innovation
                hub.
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* News & Featured Records with clips */}
      <section className="border-y bg-muted/20">
        <div className="container py-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              News & Featured Records
            </h2>
            <Link
              to="/news"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              All news
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {news.map((n) => (
              <article
                key={n.title}
                className="group overflow-hidden rounded-xl bg-card ring-1 ring-border"
              >
                <div className="aspect-video bg-muted/50">
                  <video
                    controls
                    preload="metadata"
                    aria-label={`Video: ${n.title}`}
                    className="h-full w-full object-cover"
                    src={n.clip + "#t=0.1"}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold group-hover:underline">
                    {n.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="container py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Events</h2>
          <Link
            to="/events"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View calendar
          </Link>
        </div>
        <ol className="grid gap-4 md:grid-cols-3">
          {events.map((e) => (
            <li
              key={e.title}
              className="rounded-lg bg-card p-4 ring-1 ring-border"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-primary">
                  {e.date}
                </span>
                <span
                  className={`text-xs ${e.status === "current" ? "text-green-700 dark:text-green-400" : "text-muted-foreground"}`}
                >
                  {e.status === "current" ? "Happening now" : "Upcoming"}
                </span>
              </div>
              <p className="mt-2 font-medium">{e.title}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Call to action */}
      <section className="relative isolate overflow-hidden py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-10 h-40 bg-[radial-gradient(50%_50%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]"
        />
        <div className="container">
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 ring-1 ring-border md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Join ICAS</h3>
              <p className="mt-1 text-muted-foreground">
                Learn how to apply, connect with faculty, and access financial &
                medical aid.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Contact Admissions
              </Link>
              <Link
                to="/financial-aid"
                className="inline-flex items-center rounded-md bg-secondary px-4 py-2 text-secondary-foreground transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Financial & Medical Aid
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <Newsletter />
    </main>
  );
}
