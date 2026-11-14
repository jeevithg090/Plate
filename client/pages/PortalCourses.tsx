import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { portalCourses } from "@/data/sample";

export default function PortalCourses() {
  return (
    <main>
      <SEO title="Courses — Portal" description="Your enrolled courses." />
      <section className="container py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">My Courses</h1>
          <Button asChild variant="outline"><Link to="/portal">Back to Dashboard</Link></Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portalCourses.map((c) => (
            <Card key={c.code}>
              <CardHeader>
                <CardTitle className="text-base">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-0">
                <div className="text-sm text-muted-foreground">{c.code} · {c.instructor}</div>
                <Button asChild size="sm"><Link to={`/portal/courses/${encodeURIComponent(c.code)}`} aria-label={`Open ${c.title}`}>Open</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
