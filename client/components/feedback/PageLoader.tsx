/** Suspense fallback shown while a route chunk is loading. */
export default function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="container flex min-h-[50vh] items-center justify-center py-16"
    >
      <span
        aria-hidden
        className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-primary"
      />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}
