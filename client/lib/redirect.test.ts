import { describe, expect, it } from "vitest";
import { safeRedirectPath } from "./redirect";

describe("safeRedirectPath", () => {
  it.each(["/portal", "/portal/courses/ICS%20231", "/events?tab=upcoming#top"])(
    "allows same-origin path %s",
    (path) => {
      expect(safeRedirectPath(path)).toBe(path);
    },
  );

  it.each([
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "\\\\evil.example",
    "javascript:alert(1)",
    "portal",
    "/\tevil",
    "/\n/evil.example",
  ])("rejects unsafe target %j", (path) => {
    expect(safeRedirectPath(path, "/portal")).toBe("/portal");
  });

  it("falls back for empty values", () => {
    expect(safeRedirectPath(null)).toBe("/");
    expect(safeRedirectPath(undefined, "/home")).toBe("/home");
    expect(safeRedirectPath("", "/x")).toBe("/x");
  });
});
