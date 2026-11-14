import { describe, expect, it } from "vitest";
import { MESSAGE_MAX, validateContact, validateEmail } from "./validation";

describe("validateEmail", () => {
  it("accepts a normal address", () => {
    expect(validateEmail("ada@example.com")).toBeUndefined();
    expect(validateEmail("  ada@example.co.uk ")).toBeUndefined();
  });

  it("asks for an address when empty", () => {
    expect(validateEmail("   ")).toMatch(/enter your email/i);
  });

  it("rejects malformed addresses", () => {
    for (const bad of ["ada", "ada@", "ada@example", "a da@example.com"]) {
      expect(validateEmail(bad)).toMatch(/doesn't look right/i);
    }
  });
});

describe("validateContact", () => {
  const ok = {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "I'd like to know more about the 2+2 pathway.",
  };

  it("returns no errors for valid input", () => {
    expect(validateContact(ok)).toEqual({});
  });

  it("reports every missing field", () => {
    const errors = validateContact({ name: "", email: "", message: "" });
    expect(Object.keys(errors).sort()).toEqual(["email", "message", "name"]);
  });

  it("enforces message length limits", () => {
    expect(validateContact({ ...ok, message: "hi" }).message).toMatch(
      /at least/,
    );
    expect(
      validateContact({ ...ok, message: "x".repeat(MESSAGE_MAX + 1) }).message,
    ).toMatch(/under/);
  });

  it("rejects one-letter names", () => {
    expect(validateContact({ ...ok, name: "A" }).name).toMatch(/2 characters/);
  });
});
