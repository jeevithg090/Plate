import SEO from "@/components/SEO";

export default function About() {
  return (
    <main className="min-h-screen">
      <SEO
        title="About ICAS — The Future of Applied Science Begins Here"
        description="Who we are, our history & vision, mission, and core values at the International Center for Applied Sciences (ICAS)."
      />

      <section className="container py-14">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          The Future of Applied Science Begins Here.
        </h1>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <article className="prose prose-slate max-w-none dark:prose-invert">
            <h2>Who We Are</h2>
            <p>
              The International Center for Applied Sciences (ICAS) is a premier
              academic institution dedicated to cultivating the next generation
              of innovators in engineering and technology. As a non-profit,
              non-governmental organization, we operate as a dynamic hub for
              research, education, and international collaboration. Our mission
              is to provide a unique, globally-focused learning experience that
              prepares students for a world without borders.
            </p>

            <h2>Our History & Vision</h2>
            <p>
              Founded in 1994 with the aim of promoting international academic
              exchange, ICAS was established to bridge the gap between Indian
              education and global opportunities. We recognized the growing need
              for a curriculum that not only provided a strong theoretical
              foundation but also offered a direct pathway to leading
              universities abroad. Today, we continue to fulfill that vision
              through our pioneering International Transfer Program (ITP), which
              allows students to spend their foundational years with us before
              transferring to prestigious partner universities worldwide.
            </p>
          </article>

          <article className="prose prose-slate max-w-none dark:prose-invert">
            <h2>Our Mission</h2>
            <ul>
              <li>
                <strong>To Cultivate Global Citizens:</strong> We foster a
                diverse, international community that encourages cross-cultural
                understanding and collaboration.
              </li>
              <li>
                <strong>To Drive Innovation:</strong> We provide a rigorous,
                application-oriented curriculum that challenges students to
                think critically and solve real-world problems.
              </li>
              <li>
                <strong>To Empower Future Leaders:</strong> We equip our
                students with the technical expertise, soft skills, and global
                network necessary to lead in their chosen fields.
              </li>
            </ul>

            <h2>Our Core Values</h2>
            <ul>
              <li>
                <strong>Excellence:</strong> We are committed to maintaining the
                highest standards in education, research, and institutional
                integrity.
              </li>
              <li>
                <strong>Collaboration:</strong> We believe that the greatest
                challenges are solved through partnership—within our student
                body, across our faculty, and with our international university
                partners.
              </li>
              <li>
                <strong>Innovation:</strong> We embrace new technologies and
                creative teaching methods to keep our curriculum at the cutting
                edge of applied sciences.
              </li>
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
