import SEO from "@/components/SEO";

export default function AdmissionsAid() {
  return (
    <main>
      <SEO
        title="Admissions & Aid — Your Journey to a Global Career Starts Here"
        description="Eligibility, application process, and financial aid & scholarships for ICAS."
      />
      <section className="container py-12">
        <h1 className="text-3xl font-bold tracking-tight">
          Your Journey to a Global Career Starts Here.
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          We welcome bright, ambitious students from around the world who are
          eager to embark on a career in applied sciences. Our admissions
          process identifies candidates with strong academic potential and a
          passion for innovation.
        </p>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-xl font-semibold">Admissions</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Apply to ICAS to access a globally-focused learning experience and
              a direct pathway to partner universities abroad.
            </p>

            <h3 className="mt-6 text-base font-semibold">
              Eligibility Requirements
            </h3>
            <ul className="mt-2 list-inside list-disc space-y-2 text-sm">
              <li>
                <strong>Academic Qualification:</strong> 12th standard (or
                equivalent) from a recognized board, with a minimum aggregate of
                60% in English, Physics, and Mathematics.
              </li>
              <li>
                <strong>Optional Subjects:</strong> At least one among
                Chemistry, Biology, Biotechnology, or Computer Science.
              </li>
              <li>
                <strong>Language Proficiency:</strong> For non-English medium
                students, TOEFL score of 90+.
              </li>
              <li>
                <strong>Entrance Exam:</strong> No separate test; holistic
                review based on academic record and qualifications.
              </li>
            </ul>

            <h3 className="mt-6 text-base font-semibold">
              Application Process
            </h3>
            <ol className="mt-2 list-inside list-decimal space-y-2 text-sm">
              <li>Complete and submit the online application form.</li>
              <li>Upload scanned copies of 10th and 12th-grade mark sheets.</li>
              <li>Pay the non-refundable application fee.</li>
              <li>
                Receive a confirmation email with your unique ICAS File Number
                to track status.
              </li>
            </ol>
          </article>

          <article className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-xl font-semibold">
              Financial Aid & Scholarships
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Financial constraints should not be a barrier to a world-class
              education. Explore support options below.
            </p>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="rounded-md bg-muted/30 p-3">
                <div className="font-medium">Merit-Based Scholarships</div>
                <p className="mt-1">
                  Awarded to high-achieving students based on their academic
                  performance.
                </p>
              </li>
              <li className="rounded-md bg-muted/30 p-3">
                <div className="font-medium">Need-Based Bursaries</div>
                <p className="mt-1">
                  Provided to students from low-income backgrounds to help cover
                  tuition and living expenses.
                </p>
              </li>
              <li className="rounded-md bg-muted/30 p-3">
                <div className="font-medium">External Aid Coordination</div>
                <p className="mt-1">
                  Guidance to navigate external scholarships and financial
                  assistance programs.
                </p>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              For detailed information on program fees, refund policies, and
              hostel accommodations, see the downloadable prospectus.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
