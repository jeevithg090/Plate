import { beforeEach, describe, expect, it } from "vitest";
import { MemoryStorage } from "@/test/memoryStorage";
import {
  AUTH_STORAGE_KEY,
  authenticate,
  parseAuthUser,
  readStoredUser,
  writeStoredUser,
  type DemoAccount,
} from "./auth";

const accounts: DemoAccount[] = [
  {
    email: "student@icas.edu",
    password: "secret",
    name: "Student",
    role: "student",
  },
  {
    email: "prof@icas.edu",
    password: "other",
    name: "Prof",
    role: "professor",
  },
];

describe("authenticate", () => {
  it("returns the user without the password on valid credentials", () => {
    const user = authenticate(accounts, "student@icas.edu", "secret");
    expect(user).toEqual({
      email: "student@icas.edu",
      name: "Student",
      role: "student",
    });
    expect(user).not.toHaveProperty("password");
  });

  it("ignores email case and surrounding whitespace", () => {
    expect(authenticate(accounts, "  PROF@icas.edu ", "other")?.role).toBe(
      "professor",
    );
  });

  it("rejects a wrong password or unknown email", () => {
    expect(authenticate(accounts, "student@icas.edu", "other")).toBeNull();
    expect(authenticate(accounts, "nobody@icas.edu", "secret")).toBeNull();
  });
});

describe("parseAuthUser", () => {
  it("accepts a well-formed user", () => {
    expect(
      parseAuthUser({ email: "a@b.c", name: "A", role: "admin", extra: 1 }),
    ).toEqual({
      email: "a@b.c",
      name: "A",
      role: "admin",
    });
  });

  it.each([null, "x", 42, {}, { email: "a", name: "b", role: "superuser" }])(
    "rejects %j",
    (value) => {
      expect(parseAuthUser(value)).toBeNull();
    },
  );
});

describe("session storage", () => {
  let storage: MemoryStorage;
  beforeEach(() => {
    storage = new MemoryStorage();
  });

  it("round-trips a user", () => {
    const user = { email: "a@b.c", name: "A", role: "student" as const };
    writeStoredUser(storage, user);
    expect(readStoredUser(storage)).toEqual(user);
    writeStoredUser(storage, null);
    expect(storage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it("treats corrupt or tampered data as signed out", () => {
    storage.setItem(AUTH_STORAGE_KEY, "{not json");
    expect(readStoredUser(storage)).toBeNull();
    storage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ email: "x", name: "y", role: "root" }),
    );
    expect(readStoredUser(storage)).toBeNull();
  });

  it("tolerates missing storage", () => {
    expect(readStoredUser(undefined)).toBeNull();
    expect(() => writeStoredUser(undefined, null)).not.toThrow();
  });
});
