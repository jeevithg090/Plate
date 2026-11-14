import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { safeRedirectPath } from "@/lib/redirect";
import { AlertCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";

const demoAccounts = [
  { role: "student", email: "student@icas.edu" },
  { role: "professor", email: "prof@icas.edu" },
  { role: "admin", email: "admin@icas.edu" },
];

export default function PortalLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeRedirectPath(params.get("next"), "/portal");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  if (user) return <Navigate to={next} replace />;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Enter your email and password to sign in.");
      return;
    }
    setPending(true);
    setError("");
    const ok = await login(email.trim(), password);
    setPending(false);
    if (ok) navigate(next, { replace: true });
    else
      setError(
        "Invalid email or password. Check for typos, or use a demo account below.",
      );
  };

  return (
    <main>
      <SEO
        title="Login — ICAS Portal"
        description="Sign in to access the student/faculty portal."
      />
      <section className="container flex min-h-[70vh] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <Lock className="h-5 w-5" aria-hidden />
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">
              Portal Login
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to see your courses, deadlines and grades.
            </p>
          </div>
          <form
            className="card-surface space-y-5 p-6 sm:p-8"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="grid gap-1.5">
              <Label htmlFor="login-email">Email</Label>
              <Input
                id="login-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="username"
                placeholder="you@icas.edu"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "login-error" : undefined}
                className="h-11"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="login-password">Password</Label>
              <div className="relative">
                <Input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "login-error" : undefined}
                  className="h-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 grid w-11 place-items-center rounded-r-md text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <p
                id="login-error"
                role="alert"
                className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive dark:text-red-300"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="h-11 w-full font-semibold"
              disabled={pending}
            >
              {pending ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-6 rounded-xl border border-dashed p-5">
            <h2 className="text-sm font-semibold">Try a demo account</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Password for all: <code className="font-mono">icas123</code>.
              Choose one to fill in the form.
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {demoAccounts.map((a) => (
                <li key={a.email}>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail(a.email);
                      setPassword("icas123");
                      setError("");
                    }}
                    className="w-full rounded-md border bg-background px-3 py-2 text-left text-xs transition-colors hover:bg-muted"
                  >
                    <span className="block font-semibold capitalize">
                      {a.role}
                    </span>
                    <span className="block truncate text-muted-foreground">
                      {a.email}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
