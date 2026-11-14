import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { validateEmail } from "@/lib/validation";
import { fieldControl } from "@/components/ui/form-field";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [subscribed, setSubscribed] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const problem = validateEmail(email);
    setError(problem);
    if (problem) return;
    // No mailing-list backend is connected yet; acknowledge locally.
    setSubscribed(email.trim());
    setEmail("");
  };

  return (
    <section className="relative isolate" aria-labelledby="newsletter-heading">
      <div className="container py-14">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-6 ring-1 ring-border sm:p-8">
          <div className="max-w-2xl">
            <h2
              id="newsletter-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Stay in the loop
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Get news, events, and research updates in your inbox.
            </p>
            {subscribed ? (
              <p
                role="status"
                className="mt-5 flex items-start gap-2 rounded-lg bg-card p-4 text-sm ring-1 ring-border"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
                  aria-hidden
                />
                <span>
                  Thanks! <strong>{subscribed}</strong> is on the list. (Demo
                  only: no emails are sent yet.)
                </span>
              </p>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-5">
                <div className="flex gap-2 max-sm:flex-col">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(validateEmail(e.target.value));
                    }}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "newsletter-error" : undefined}
                    className={`${fieldControl} h-11 flex-1`}
                  />
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>
                {error ? (
                  <p
                    id="newsletter-error"
                    className="mt-2 text-xs font-medium text-destructive dark:text-red-400"
                  >
                    {error}
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
