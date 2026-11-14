import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { programs } from "@/data/sample";

export default function ProgramCarousel() {
  const [viewportRef, embla] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    loop: false,
  });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  return (
    <section className="container py-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Featured Programs</h2>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous program"
            onClick={scrollPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
          >
            <ChevronLeft size={18} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next program"
            onClick={scrollNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
          >
            <ChevronRight size={18} aria-hidden />
          </button>
        </div>
      </div>

      <div className="overflow-hidden" ref={viewportRef}>
        <div className="-ml-4 flex">
          {programs.map((p) => (
            <article
              key={p.id}
              className="card-surface ml-4 flex min-w-[85%] shrink-0 flex-col p-6 sm:min-w-[55%] md:min-w-[33%]"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap size={18} aria-hidden />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {p.level}
                </div>
              </div>
              <h3 className="mt-3 text-lg font-semibold">{p.name}</h3>
              <div className="text-xs text-muted-foreground">{p.duration}</div>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">
                {p.summary}
              </p>
              <Link
                to="/academics"
                className="mt-4 inline-flex h-10 w-fit items-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                View details
                <span className="sr-only"> about {p.name}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
