/**
 * Demo-only authentication helpers.
 *
 * The portal has no backend: accounts live in `client/data/sample.ts`
 * and the session is a JSON blob in localStorage. This is suitable for a
 * showcase site only — never for real credentials.
 */

export const ROLES = ["student", "professor", "admin"] as const;
export type Role = (typeof ROLES)[number];

export interface AuthUser {
  email: string;
  name: string;
  role: Role;
}

export interface DemoAccount extends AuthUser {
  password: string;
}

export const AUTH_STORAGE_KEY = "icas_auth_user";

function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && (ROLES as readonly string[]).includes(value)
  );
}

/** Validates an unknown value (e.g. parsed JSON) as an AuthUser. */
export function parseAuthUser(value: unknown): AuthUser | null {
  if (!value || typeof value !== "object") return null;
  const v = value as Record<string, unknown>;
  if (typeof v.email !== "string" || typeof v.name !== "string") return null;
  if (!isRole(v.role)) return null;
  return { email: v.email, name: v.name, role: v.role };
}

/** Checks credentials against the demo accounts (email is case-insensitive). */
export function authenticate(
  accounts: readonly DemoAccount[],
  email: string,
  password: string,
): AuthUser | null {
  const normalized = email.trim().toLowerCase();
  const match = accounts.find(
    (a) => a.email.toLowerCase() === normalized && a.password === password,
  );
  return match
    ? { email: match.email, name: match.name, role: match.role }
    : null;
}

export function readStoredUser(storage: Storage | undefined): AuthUser | null {
  try {
    const raw = storage?.getItem(AUTH_STORAGE_KEY);
    return raw ? parseAuthUser(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function writeStoredUser(
  storage: Storage | undefined,
  user: AuthUser | null,
) {
  try {
    if (user) storage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    else storage?.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode, quota); keep the in-memory session.
  }
}
