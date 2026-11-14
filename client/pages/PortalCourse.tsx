import { useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { portalCourses, portalCourseDetails } from "@/data/sample";
import { getSubmissions, saveSubmission, type Submission } from "@/lib/localdb";

type Assignment = (typeof portalCourseDetails)[string]["assignments"][number];

function AssignmentCard({
  assignment,
  submission,
  onSubmitted,
}: {
  assignment: Assignment;
  submission?: Submission;
  onSubmitted: (s: Submission) => void;
}) {
  const urlId = `${assignment.id}-url`;
  const notesId = `${assignment.id}-notes`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const s: Submission = {
      assignmentId: assignment.id,
      url: String(fd.get("url") ?? "").trim(),
      notes: String(fd.get("notes") ?? "").trim(),
      submittedAt: new Date().toISOString(),
    };
    if (!saveSubmission(s)) {
      toast.error("Couldn't save your submission. Is browser storage enabled?");
      return;
    }
    onSubmitted(s);
    toast.success(`Submitted “${assignment.title}”`);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 pt-0">
        <div className="text-xs text-muted-foreground">
          Due {new Date(assignment.due).toLocaleString()} · Max {assignment.maxMarks} marks
        </div>
        <form onSubmit={onSubmit} className="grid gap-2">
          <Label htmlFor={urlId} className="sr-only">
            Submission URL
          </Label>
          <Input
            id={urlId}
            name="url"
            type="url"
            placeholder="Submission URL (GitHub/Drive/etc.)"
            required
          />
          <Label htmlFor={notesId} className="sr-only">
            Notes
          </Label>
          <Textarea id={notesId} name="notes" placeholder="Notes (optional)" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs text-muted-foreground" aria-live="polite">
              {submission
                ? `Last submitted ${new Date(submission.submittedAt).toLocaleString()}`
                : "Not submitted"}
            </div>
            <Button type="submit" size="sm">
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function PortalCourse() {
  const { code = "" } = useParams();
  const course = portalCourses.find((c) => c.code === code);
  const details = portalCourseDetails[code];
  const [submissions, setSubmissions] = useState(() => getSubmissions());

  if (!course && !details) {
    return (
      <main className="container py-10">
        <SEO title="Course not found — Portal" />
        <h1 className="text-2xl font-bold tracking-tight">Course not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find a course with code “{code}”.
        </p>
        <Button asChild variant="outline" className="mt-6">
          <Link to="/portal/courses">All courses</Link>
        </Button>
      </main>
    );
  }

  const title = course?.title ?? code;
  const assignments = details?.assignments ?? [];

  return (
    <main>
      <SEO title={`${code} — Portal`} description={title} />
      <section className="container py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            <div className="text-sm text-muted-foreground">{code}</div>
          </div>
          <Button asChild variant="outline">
            <Link to="/portal/courses">All courses</Link>
          </Button>
        </div>

        <Tabs defaultValue="assignments" className="mt-6">
          <TabsList>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          </TabsList>

          <TabsContent value="assignments" className="mt-4 grid gap-4">
            {assignments.length === 0 && (
              <p className="text-sm text-muted-foreground">No assignments posted yet.</p>
            )}
            {assignments.map((a) => (
              <AssignmentCard
                key={a.id}
                assignment={a}
                submission={submissions[a.id]}
                onSubmitted={(s) =>
                  setSubmissions((prev) => ({ ...prev, [s.assignmentId]: s }))
                }
              />
            ))}
          </TabsContent>

          <TabsContent value="syllabus" className="mt-4">
            <Card>
              <CardContent className="prose max-w-none p-4 text-sm dark:prose-invert">
                {details?.syllabus || "Syllabus will be available soon."}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
