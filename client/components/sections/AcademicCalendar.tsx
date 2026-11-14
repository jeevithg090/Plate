import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { academicCalendarEvents } from "@/data/sample";

const PDF_URL =
  "https://cdn.builder.io/o/assets%2F766318eacea44b40bcc70d9d860cc3ef%2F1d5614de69b34837bfd1b30ba67f5db4?alt=media&token=09e7303b-2f32-4258-b935-bc25d40b061d&apiKey=766318eacea44b40bcc70d9d860cc3ef";

function groupDatesByType() {
  const holiday: Date[] = [];
  const exam: Date[] = [];
  const event: Date[] = [];
  for (const e of academicCalendarEvents) {
    const d = new Date(e.date);
    if (e.type === "holiday") holiday.push(d);
    else if (e.type === "exam") exam.push(d);
    else event.push(d);
  }
  return { holiday, exam, event };
}

export default function AcademicCalendar() {
  const groups = groupDatesByType();
  const [selected, setSelected] = useState<Date | undefined>();
  const selectedItems = useMemo(() => {
    if (!selected) return [] as typeof academicCalendarEvents;
    const y = selected.getFullYear();
    const m = selected.getMonth();
    const d = selected.getDate();
    return academicCalendarEvents.filter((e) => {
      const dt = new Date(e.date);
      return (
        dt.getFullYear() === y && dt.getMonth() === m && dt.getDate() === d
      );
    });
  }, [selected]);

  const upcoming = useMemo(
    () =>
      [...academicCalendarEvents]
        .filter(
          (e) => new Date(e.date).getTime() >= new Date().setHours(0, 0, 0, 0),
        )
        .sort((a, b) => +new Date(a.date) - +new Date(b.date))
        .slice(0, 8),
    [],
  );

  return (
    <section className="container py-12">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Academic Calendar 2025–26
        </h2>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white">Event</Badge>
          <Badge className="bg-amber-600 text-white">Exam</Badge>
          <Badge className="bg-rose-600 text-white">Holiday</Badge>
          <Button asChild size="sm" variant="outline">
            <a href={PDF_URL} target="_blank" rel="noreferrer">
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              className="rounded-md border"
              numberOfMonths={2}
              mode="single"
              selected={selected}
              onSelect={setSelected}
              modifiers={groups}
              modifiersClassNames={{
                event: "bg-emerald-600 text-white hover:bg-emerald-600",
                exam: "bg-amber-600 text-white hover:bg-amber-600",
                holiday: "bg-rose-600 text-white hover:bg-rose-600",
              }}
            />
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Selected Day</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="text-muted-foreground">
                {selected
                  ? selected.toDateString()
                  : "Click a date to view details"}
              </div>
              {selected &&
                (selectedItems.length ? (
                  selectedItems.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between rounded-md border p-3"
                    >
                      <div className="font-medium">{e.title}</div>
                      <Badge
                        className={
                          e.type === "holiday"
                            ? "bg-rose-600 text-white"
                            : e.type === "exam"
                              ? "bg-amber-600 text-white"
                              : "bg-emerald-600 text-white"
                        }
                      >
                        {e.type}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="rounded-md border p-3">No special event</div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {upcoming.map((e, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between rounded-md border p-3 text-sm"
                >
                  <div>
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(e.date).toDateString()}
                    </div>
                  </div>
                  <Badge
                    className={
                      e.type === "holiday"
                        ? "bg-rose-600 text-white"
                        : e.type === "exam"
                          ? "bg-amber-600 text-white"
                          : "bg-emerald-600 text-white"
                    }
                  >
                    {e.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Full Calendar (PDF)</CardTitle>
        </CardHeader>
        <CardContent>
          <object
            data={PDF_URL}
            type="application/pdf"
            className="h-[720px] w-full rounded-md border"
            aria-label="Academic Calendar PDF"
          >
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              Open calendar PDF
            </a>
          </object>
        </CardContent>
      </Card>
    </section>
  );
}
