import SEO from "@/components/SEO";

export default function Enigma() {
  return (
    <main>
      <SEO title="The ICAS Innovators — ENIGMA Student Club" description="Transform your passion into a profession across Development, Research, and Robotics domains." />

      <section className="container py-12">
        <p className="text-sm font-semibold text-primary">Student Club: The ICAS Innovators</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Transform Your Passion into a Profession.</h1>
        <p className="mt-3 max-w-3xl text-muted-foreground">
          The ICAS Innovators is the hub of student-led activity, designed to give you hands-on experience and a community of
          like‑minded creators. Our club is structured into three specialized domains, each a microcosm of the cutting‑edge
          industries you will enter after graduation.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <article className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-xl font-semibold">1. The Development Domain</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Where ideas become reality. We architect and build the digital and physical world—from mobile apps and web platforms
              to sophisticated software systems.
            </p>
            <h3 className="mt-4 font-medium">Skills You'll Master</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>Full‑stack web development and mobile app development</li>
              <li>Software engineering principles, UI/UX design, database management</li>
            </ul>
            <h3 className="mt-4 font-medium">Projects We Undertake</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>ICAS Connect — a social and academic platform for students</li>
              <li>Project Pulse — engagement analytics for student clubs</li>
              <li>Open‑source contributions across global projects</li>
            </ul>
          </article>

          <article className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-xl font-semibold">2. The Research Domain</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For the curious and intellectually driven. Work in small teams under faculty mentorship on cutting‑edge topics,
              from machine learning to sustainable systems.
            </p>
            <h3 className="mt-4 font-medium">Skills You'll Master</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>Scientific methodology, data analysis, academic writing</li>
              <li>Literature review and research presentation</li>
            </ul>
            <h3 className="mt-4 font-medium">Areas of Focus</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>AI & Machine Learning — predictive models and cognitive systems</li>
              <li>Sustainable Technologies — eco‑friendly materials and renewables</li>
              <li>Advanced Aerodynamics — simulation and next‑gen aircraft design</li>
            </ul>
          </article>

          <article className="rounded-xl bg-card p-6 ring-1 ring-border">
            <h2 className="text-xl font-semibold">3. The Robotics Domain</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Where engineering, software, and creativity collide. Design, build, and program autonomous and RC robots for
              national and international challenges.
            </p>
            <h3 className="mt-4 font-medium">Skills You'll Master</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>Mechatronics, embedded systems, sensors, and control</li>
              <li>Programming in C++ and Python; teamwork under pressure</li>
            </ul>
            <h3 className="mt-4 font-medium">Recent Achievements</h3>
            <ul className="mt-2 list-inside list-disc text-sm">
              <li>RoboCup Challenge — top 10% nationally with an autonomous drone prototype</li>
              <li>BattleBots Showcase — built and tested a combat‑ready robot</li>
              <li>Community Outreach — robotics workshops for local schools</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
