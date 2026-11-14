import { useState, type FormEvent } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import SEO from "@/components/SEO";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { safeRedirectPath } from "@/lib/redirect";

export default function PortalLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeRedirectPath(params.get("next"), "/portal");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  if (user) return <Navigate to={next} replace />;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setError("");
    const ok = await login(String(fd.get("email") ?? ""), String(fd.get("password") ?? ""));
    setPending(false);
    if (ok) navigate(next, { replace: true });
    else setError("Invalid email or password.");
  };

  return (
    <main>
      <SEO
        title="Login — ICAS Portal"
        description="Sign in to access the student/faculty portal."
      />
      <section className="container py-10">
        <h1 className="text-2xl font-bold tracking-tight">Portal Login</h1>
        <form className="mt-6 max-w-sm space-y-4" onSubmit={onSubmit}>
          <div className="grid gap-1.5">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="username"
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="login-password">Password</Label>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "login-error" : undefined}
            />
          </div>
          {error && (
            <p id="login-error" role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Demo accounts: student@icas.edu (student), prof@icas.edu (professor),
            admin@icas.edu (admin). Password: icas123
          </p>
        </form>
      </section>
    </main>
  );
}
