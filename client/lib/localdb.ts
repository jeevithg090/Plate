import { getBrowserStorage } from "./storage";

/** An assignment submission stored locally in the browser (demo only). */
export interface Submission {
  assignmentId: string;
  url?: string;
  notes?: string;
  submittedAt: string;
}

export const SUBMISSIONS_STORAGE_KEY = "icas_submissions";

function isSubmission(value: unknown): value is Submission {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.assignmentId === "string" && typeof v.submittedAt === "string"
  );
}

export function getSubmissions(
  storage: Storage | undefined = getBrowserStorage(),
): Record<string, Submission> {
  try {
    const raw = storage?.getItem(SUBMISSIONS_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, v]) => isSubmission(v)),
    ) as Record<string, Submission>;
  } catch {
    return {};
  }
}

/** Saves (or replaces) the submission for an assignment. Returns false if storage failed. */
export function saveSubmission(
  submission: Submission,
  storage: Storage | undefined = getBrowserStorage(),
): boolean {
  if (!storage) return false;
  const all = getSubmissions(storage);
  all[submission.assignmentId] = submission;
  try {
    storage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(all));
    return true;
  } catch {
    return false;
  }
}

export function getSubmission(
  id: string,
  storage: Storage | undefined = getBrowserStorage(),
): Submission | undefined {
  return getSubmissions(storage)[id];
}
