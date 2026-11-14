import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { matchRoutes, NAV_ROUTES, type NavChoice } from "@/lib/navigator";

interface Message {
  role: "user" | "assistant";
  content: string;
  choices?: NavChoice[];
}

export default function AiNavBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m the ICAS navigator. Ask me to find pages, events, or resources—try ‘show upcoming events’ or ‘financial aid’.",
      choices: NAV_ROUTES.slice(1, 4).map((r) => ({
        label: r.title,
        to: r.to,
      })),
    },
  ]);
  const navigate = useNavigate();
  const panelId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (to: string) => {
    navigate(to);
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", content: q }]);

    const choices = matchRoutes(q);
    const response: Message = choices.length
      ? {
          role: "assistant",
          content: "Here’s what I found. Choose a destination:",
          choices,
        }
      : {
          role: "assistant",
          content:
            "I didn’t catch that. Try keywords like ‘research’, ‘events’, or ‘contact’.",
        };
    setMessages((m) => [...m, response]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Panel */}
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="ICAS Navigator"
          className="mb-3 w-[min(92vw,380px)] overflow-hidden rounded-xl bg-card shadow-soft ring-1 ring-border"
        >
          <div className="flex items-center justify-between border-b p-3">
            <div className="text-sm font-semibold">ICAS Navigator</div>
            <button
              type="button"
              className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
              onClick={() => setOpen(false)}
              aria-label="Close navigator"
            >
              Close
            </button>
          </div>
          <div
            ref={listRef}
            aria-live="polite"
            className="max-h-72 space-y-3 overflow-auto p-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "assistant" ? "" : "text-right"}
              >
                <div
                  className={`inline-block rounded-lg px-3 py-2 text-sm ${m.role === "assistant" ? "bg-muted text-foreground" : "bg-primary text-primary-foreground"}`}
                >
                  {m.content}
                </div>
                {m.choices && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {m.choices.map((c) => (
                      <button
                        type="button"
                        key={c.to}
                        className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
                        onClick={() => go(c.to)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
            <input
              ref={inputRef}
              aria-label="Ask ICAS"
              className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Ask to navigate…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:brightness-110"
            >
              Go
            </button>
          </form>
        </div>
      )}

      {/* Toggles row */}
      <div className="flex items-center justify-end gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
        >
          <span
            aria-hidden
            className="h-2 w-2 animate-pulse rounded-full bg-accent"
          />
          Ask ICAS
        </button>
      </div>
    </div>
  );
}
