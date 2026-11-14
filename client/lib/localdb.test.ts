import { beforeEach, describe, expect, it } from "vitest";
import { MemoryStorage } from "@/test/memoryStorage";
import {
  getSubmission,
  getSubmissions,
  saveSubmission,
  SUBMISSIONS_STORAGE_KEY,
} from "./localdb";

describe("localdb submissions", () => {
  let storage: MemoryStorage;
  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it("starts empty", () => {
    expect(getSubmissions(storage)).toEqual({});
  });

  it("saves and replaces submissions per assignment", () => {
    saveSubmission(
      { assignmentId: "a1", url: "u1", submittedAt: "2025-01-01T00:00:00Z" },
      storage,
    );
    saveSubmission(
      { assignmentId: "a2", submittedAt: "2025-01-02T00:00:00Z" },
      storage,
    );
    saveSubmission(
      { assignmentId: "a1", url: "u2", submittedAt: "2025-01-03T00:00:00Z" },
      storage,
    );

    expect(Object.keys(getSubmissions(storage))).toEqual(["a1", "a2"]);
    expect(getSubmission("a1", storage)?.url).toBe("u2");
    expect(getSubmission("missing", storage)).toBeUndefined();
  });

  it("ignores corrupt and malformed stored data", () => {
    storage.setItem(SUBMISSIONS_STORAGE_KEY, "nope");
    expect(getSubmissions(storage)).toEqual({});

    storage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify([1, 2]));
    expect(getSubmissions(storage)).toEqual({});

    storage.setItem(
      SUBMISSIONS_STORAGE_KEY,
      JSON.stringify({
        ok: { assignmentId: "ok", submittedAt: "t" },
        bad: { foo: 1 },
      }),
    );
    expect(Object.keys(getSubmissions(storage))).toEqual(["ok"]);
  });

  it("reports failure when storage is unavailable or full", () => {
    expect(
      saveSubmission({ assignmentId: "a", submittedAt: "t" }, undefined),
    ).toBe(false);

    const full = new MemoryStorage();
    full.setItem = () => {
      throw new Error("QuotaExceededError");
    };
    expect(saveSubmission({ assignmentId: "a", submittedAt: "t" }, full)).toBe(
      false,
    );
  });
});
