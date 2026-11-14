// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Protected from "@/components/auth/Protected";
import { AUTH_STORAGE_KEY } from "@/lib/auth";
import PortalLogin from "./PortalLogin";

function LocationProbe() {
  const { pathname, search } = useLocation();
  return <div data-testid="location">{pathname + search}</div>;
}

function renderAt(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<PortalLogin />} />
          <Route
            path="/portal/*"
            element={
              <Protected>
                <h1>Dashboard</h1>
              </Protected>
            }
          />
          <Route path="*" element={<h1>Elsewhere</h1>} />
        </Routes>
        <LocationProbe />
      </AuthProvider>
    </MemoryRouter>,
  );
}

async function signIn(email: string, password: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText("Email"), email);
  await user.type(screen.getByLabelText("Password"), password);
  await user.click(screen.getByRole("button", { name: "Sign in" }));
}

describe("portal login flow", () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => cleanup());

  it("redirects signed-out visitors to the login page with a return path", () => {
    renderAt("/portal/courses");
    expect(screen.getByRole("heading", { name: "Portal Login" })).toBeTruthy();
    expect(screen.getByTestId("location").textContent).toBe(
      "/login?next=%2Fportal%2Fcourses",
    );
  });

  it("shows an error for invalid credentials", async () => {
    renderAt("/login");
    await signIn("student@icas.edu", "wrong");
    expect(screen.getByRole("alert").textContent).toMatch(
      /invalid email or password/i,
    );
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it("signs in and returns to the requested page", async () => {
    renderAt("/login?next=%2Fportal%2Fcourses");
    await signIn("student@icas.edu", "icas123");
    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeTruthy();
    expect(screen.getByTestId("location").textContent).toBe("/portal/courses");
    expect(JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY)!)).toMatchObject({
      email: "student@icas.edu",
      role: "student",
    });
  });

  it("ignores off-site ?next= targets", async () => {
    renderAt("/login?next=%2F%2Fevil.example");
    await signIn("prof@icas.edu", "icas123");
    expect(
      await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeTruthy();
    expect(screen.getByTestId("location").textContent).toBe("/portal");
  });

  it("keeps a stored session across reloads", () => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ email: "admin@icas.edu", name: "Admin", role: "admin" }),
    );
    renderAt("/portal");
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeTruthy();
  });
});
