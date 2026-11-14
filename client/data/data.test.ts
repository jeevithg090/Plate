import { describe, expect, it } from "vitest";
import { alumniCohorts, partnerUniversities } from "./partnerUniversities";
import { portalCourseDetails, portalCourses, portalUsers } from "./sample";

describe("sample data integrity", () => {
  it("has a detail entry for every portal course", () => {
    for (const course of portalCourses) {
      expect(portalCourseDetails, course.code).toHaveProperty([course.code]);
    }
  });

  it("uses unique assignment ids across courses", () => {
    const ids = Object.values(portalCourseDetails).flatMap((d) =>
      d.assignments.map((a) => a.id),
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique demo account emails", () => {
    const emails = portalUsers.map((u) => u.email.toLowerCase());
    expect(new Set(emails).size).toBe(emails.length);
  });
});

describe("partner universities", () => {
  it("have unique ids and valid coordinates", () => {
    const ids = partnerUniversities.map((u) => u.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const u of partnerUniversities) {
      expect(Math.abs(u.lat), u.id).toBeLessThanOrEqual(90);
      expect(Math.abs(u.lon), u.id).toBeLessThanOrEqual(180);
    }
  });

  it("have internally consistent alumni counts", () => {
    for (const [id, c] of Object.entries(alumniCohorts)) {
      expect(c.cs + c.mech + c.other, id).toBe(c.total);
      expect(c.total, id).toBeGreaterThan(0);
    }
  });
});
