import { lazy, type ComponentType, type LazyExoticComponent } from "react";

export interface AppRoute {
  path: string;
  Component: LazyExoticComponent<ComponentType>;
  /** Requires a signed-in portal user. */
  protected?: boolean;
}

// Route-level code splitting keeps the home page bundle small.
export const appRoutes: AppRoute[] = [
  { path: "/about", Component: lazy(() => import("@/pages/About")) },
  { path: "/academics", Component: lazy(() => import("@/pages/Academics")) },
  { path: "/research", Component: lazy(() => import("@/pages/Research")) },
  {
    path: "/student-life",
    Component: lazy(() => import("@/pages/StudentLife")),
  },
  { path: "/enigma", Component: lazy(() => import("@/pages/Enigma")) },
  {
    path: "/admissions-aid",
    Component: lazy(() => import("@/pages/AdmissionsAid")),
  },
  { path: "/transfer", Component: lazy(() => import("@/pages/Transfer")) },
  { path: "/news", Component: lazy(() => import("@/pages/News")) },
  { path: "/events", Component: lazy(() => import("@/pages/Events")) },
  { path: "/faculty", Component: lazy(() => import("@/pages/Faculty")) },
  {
    path: "/financial-aid",
    Component: lazy(() => import("@/pages/FinancialAid")),
  },
  { path: "/medical-aid", Component: lazy(() => import("@/pages/MedicalAid")) },
  { path: "/impact", Component: lazy(() => import("@/pages/Impact")) },
  { path: "/contact", Component: lazy(() => import("@/pages/Contact")) },
  { path: "/login", Component: lazy(() => import("@/pages/PortalLogin")) },
  {
    path: "/portal",
    Component: lazy(() => import("@/pages/Portal")),
    protected: true,
  },
  {
    path: "/portal/courses",
    Component: lazy(() => import("@/pages/PortalCourses")),
    protected: true,
  },
  {
    path: "/portal/courses/:code",
    Component: lazy(() => import("@/pages/PortalCourse")),
    protected: true,
  },
];
