import { describe, expect, it } from "vitest";
import { matchRoutes, NAV_ROUTES } from "./navigator";

describe("matchRoutes", () => {
  it("returns nothing for an empty query", () => {
    expect(matchRoutes("   ")).toEqual([]);
  });

  it("matches keywords case-insensitively", () => {
    expect(matchRoutes("Show me UPCOMING events")[0]).toEqual({
      label: "Events",
      to: "/events",
    });
  });

  it("ranks pages with more keyword hits first", () => {
    const results = matchRoutes("financial aid and tuition");
    expect(results[0].to).toBe("/financial-aid");
    expect(results.map((r) => r.to)).toContain("/admissions-aid");
  });

  it("respects the result limit", () => {
    expect(matchRoutes("aid community student", NAV_ROUTES, 2)).toHaveLength(2);
  });

  it("returns no match for unknown words", () => {
    expect(matchRoutes("quantum pizza")).toEqual([]);
  });

  it("only links to unique, root-relative routes", () => {
    const paths = NAV_ROUTES.map((r) => r.to);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((p) => p.startsWith("/"))).toBe(true);
  });
});
