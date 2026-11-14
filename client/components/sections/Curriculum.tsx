import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { curricula, type Curriculum } from "@/data/sample";

function SemesterTable({ sem }: { sem: Curriculum["semesters"][number] }) {
  return (
    <div className="mt-2 overflow-hidden rounded-md ring-1 ring-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-3 py-2">Subject</th>
            <th className="px-3 py-2 w-24 text-right">Credits</th>
          </tr>
        </thead>
        <tbody>
          {sem.subjects.map((s) => (
            <tr key={s.title} className="border-t">
              <td className="px-3 py-2">{s.title}</td>
              <td className="px-3 py-2 text-right tabular-nums">{s.credits}</td>
            </tr>
          ))}
          <tr className="border-t font-medium">
            <td className="px-3 py-2">Semester Total</td>
            <td className="px-3 py-2 text-right tabular-nums">{sem.credits}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default function Curriculum() {
  const entries = Object.entries(curricula);
  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold tracking-tight">Subjects & Credits</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Detailed semester-wise curriculum for Years 1 and 2 at ICAS (2+2
        pathway).
      </p>

      <div className="mt-6 rounded-xl bg-card p-2 ring-1 ring-border">
        <Accordion type="single" collapsible>
          {entries.map(([key, cur]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>
                <div>
                  <div className="text-base font-semibold">{cur.program}</div>
                  <div className="text-xs font-normal text-muted-foreground">
                    Total: {cur.totalCredits} credits • {cur.yearBreakdown}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {cur.semesters.map((sem) => (
                    <div
                      key={sem.name}
                      className="rounded-lg bg-background p-4 ring-1 ring-border"
                    >
                      <div className="text-sm font-semibold">
                        {sem.name} — {sem.credits} credits
                      </div>
                      <SemesterTable sem={sem} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
