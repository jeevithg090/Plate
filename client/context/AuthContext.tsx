import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { portalUsers } from "@/data/sample";
import {
  authenticate,
  readStoredUser,
  writeStoredUser,
  type AuthUser,
} from "@/lib/auth";
import { getBrowserStorage } from "@/lib/storage";

export type { AuthUser, Role } from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Read the session synchronously so protected routes don't redirect to
  // /login on a hard refresh before the stored session is restored.
  const [user, setUser] = useState<AuthUser | null>(() =>
    readStoredUser(getBrowserStorage()),
  );

  const login = useCallback(async (email: string, password: string) => {
    const match = authenticate(portalUsers, email, password);
    if (!match) return false;
    setUser(match);
    writeStoredUser(getBrowserStorage(), match);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeStoredUser(getBrowserStorage(), null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
