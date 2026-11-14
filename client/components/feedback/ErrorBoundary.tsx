import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** When this value changes, a captured error is cleared (e.g. on navigation). */
  resetKey?: unknown;
}

interface State {
  error: Error | null;
}

/** Catches render errors (including failed lazy chunk loads) and shows a recovery UI. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack);
  }

  componentDidUpdate(prev: Props) {
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <main
        role="alert"
        className="container flex min-h-[60vh] items-center justify-center py-16"
      >
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            This page failed to load. Check your connection and try again. If
            the problem continues, head back to the home page.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Reload page
            </button>
            <a
              href="/"
              className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted"
            >
              Go to home
            </a>
          </div>
        </div>
      </main>
    );
  }
}
