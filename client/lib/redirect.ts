/**
 * Returns `next` only if it is a same-origin, root-relative path.
 * Anything else (absolute URLs, protocol-relative `//host`, backslash
 * tricks, `javascript:` …) falls back to `fallback`, preventing open
 * redirects through the `?next=` login parameter.
 */
export function safeRedirectPath(
  next: string | null | undefined,
  fallback = "/",
): string {
  if (!next) return fallback;
  if (!next.startsWith("/")) return fallback;
  if (next.startsWith("//") || next.includes("\\")) return fallback;
  // Reject control characters, which browsers may strip before parsing.
  // eslint-disable-next-line no-control-regex
  if (/[\u0000-\u001f\u007f]/.test(next)) return fallback;
  return next;
}
