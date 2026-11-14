import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

/** Redirects to /login (remembering the requested path) when signed out. */
export default function Protected({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { pathname, search } = useLocation();
  if (!user) {
    const next = encodeURIComponent(pathname + search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }
  return <>{children}</>;
}
