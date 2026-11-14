import { useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Phone, Info } from "lucide-react";
import SEO from "@/components/SEO";
import FormField, { fieldControl } from "@/components/ui/form-field";
import { contacts } from "@/data/sample";
import {
  MESSAGE_MAX,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from "@/lib/validation";

const empty: ContactInput = { name: "", email: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update =
    (field: keyof ContactInput) => (e: { target: { value: string } }) => {
      const next = { ...values, [field]: e.target.value };
      setValues(next);
      // Re-validate a field once it has shown an error, so it clears as soon
      // as the input is fixed.
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateContact(next)[field],
        }));
      }
    };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof ContactInput)[])[0];
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    // The form isn't connected to a backend yet; confirm locally.
    setSentTo(values.email.trim());
    setValues(empty);
    requestAnimationFrame(() => successRef.current?.focus());
  };

  return (
    <main>
      <SEO
        title="Contact — ICAS"
        description="Questions about admissions, the 2+2 pathway or campus life? Reach the ICAS team by email, phone or the contact form."
      />
      <header className="page-header">
        <div className="container py-12 md:py-16">
          <p className="eyebrow">Get in touch</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Contact ICAS
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Questions about admissions, the 2+2 transfer pathway or student
            life? Send us a message and the right team will get back to you.
          </p>
        </div>
      </header>

      <section className="container grid gap-8 py-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-surface p-6 md:p-8">
          {sentTo ? (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              className="flex flex-col items-start gap-4 outline-none"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <CheckCircle2 className="h-6 w-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-xl font-semibold">Thanks, message noted</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We'll reply to <strong>{sentTo}</strong>. This demo form isn't
                  connected to an inbox yet, so for anything urgent email{" "}
                  <a className="link" href={`mailto:${contacts.email}`}>
                    {contacts.email}
                  </a>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSentTo(null)}
                className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              aria-labelledby="contact-form-heading"
              className="grid gap-5"
            >
              <h2 id="contact-form-heading" className="text-xl font-semibold">
                Send a message
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Name" error={errors.name}>
                  {(field) => (
                    <input
                      {...field}
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={update("name")}
                      className={fieldControl}
                    />
                  )}
                </FormField>
                <FormField label="Email" error={errors.email}>
                  {(field) => (
                    <input
                      {...field}
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={update("email")}
                      className={fieldControl}
                    />
                  )}
                </FormField>
              </div>
              <FormField
                label="Message"
                error={errors.message}
                hint={`${values.message.trim().length}/${MESSAGE_MAX} characters`}
              >
                {(field) => (
                  <textarea
                    {...field}
                    name="message"
                    rows={6}
                    maxLength={MESSAGE_MAX}
                    value={values.message}
                    onChange={update("message")}
                    className={`${fieldControl} resize-y`}
                  />
                )}
              </FormField>
              <div className="flex flex-col-reverse items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  Demo form: messages aren't sent anywhere yet.
                </p>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Send message
                </button>
              </div>
            </form>
          )}
        </div>

        <aside
          aria-label="Contact details"
          className="grid content-start gap-4"
        >
          {[
            {
              icon: MapPin,
              label: "Address",
              body: <span>{contacts.address}</span>,
            },
            {
              icon: Mail,
              label: "Email",
              body: (
                <a className="link" href={`mailto:${contacts.email}`}>
                  {contacts.email}
                </a>
              ),
            },
            {
              icon: Phone,
              label: "Phone",
              body: (
                <a
                  className="link"
                  href={`tel:${contacts.phone.replace(/\s/g, "")}`}
                >
                  {contacts.phone}
                </a>
              ),
            },
          ].map(({ icon: Icon, label, body }) => (
            <div
              key={label}
              className="card-surface flex items-start gap-4 p-5"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div className="text-sm">
                <div className="font-semibold">{label}</div>
                <div className="mt-0.5 text-muted-foreground">{body}</div>
              </div>
            </div>
          ))}
          <a
            className="link w-fit text-sm"
            href={contacts.map}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Google Maps
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </aside>
      </section>
    </main>
  );
}
