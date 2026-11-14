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
import { formatDateTime } from "@/lib/utils";
import { CheckCircle2, Circle, Inbox } from "lucide-react";

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
          Due {formatDateTime(assignment.due)} · Max {assignment.maxMarks} marks
        </div>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor={urlId}>Submission link</Label>
            <Input
              id={urlId}
              name="url"
              type="url"
              inputMode="url"
              placeholder="https://github.com/you/project"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor={notesId}>
              Notes{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              id={notesId}
              name="notes"
              placeholder="Anything your instructor should know"
            />
          </div>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                submission
                  ? "text-emerald-700 dark:text-emerald-400"
                  : "text-muted-foreground"
              }`}
              aria-live="polite"
            >
              {submission ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <Circle className="h-3.5 w-3.5" aria-hidden />
              )}
              {submission
                ? `Submitted ${formatDateTime(submission.submittedAt)}`
                : "Not submitted yet"}
            </div>
            <Button type="submit">{submission ? "Resubmit" : "Submit"}</Button>
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
        <nav aria-label="Breadcrumb" className="mb-4 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
            <li>
              <Link to="/portal" className="hover:text-foreground">
                Portal
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link to="/portal/courses" className="hover:text-foreground">
                Courses
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-medium text-foreground">
              {code}
            </li>
          </ol>
        </nav>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {title}
            </h1>
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
              <div className="rounded-xl border border-dashed p-10 text-center">
                <Inbox
                  className="mx-auto h-8 w-8 text-muted-foreground"
                  aria-hidden
                />
                <p className="mt-3 font-medium">No assignments posted yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  New work from your instructor will appear here.
                </p>
              </div>
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
