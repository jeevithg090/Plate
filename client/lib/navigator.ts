/** Keyword index used by the on-site "Ask ICAS" navigator. */
export interface NavRoute {
  to: string;
  title: string;
  keywords: string[];
}

export interface NavChoice {
  label: string;
  to: string;
}

export const NAV_ROUTES: NavRoute[] = [
  { to: "/", title: "Home", keywords: ["home", "homepage", "start"] },
  {
    to: "/about",
    title: "About",
    keywords: ["about", "timeline", "history", "research stats"],
  },
  {
    to: "/academics",
    title: "Academics",
    keywords: ["academics", "courses", "programs", "degree", "curriculum"],
  },
  {
    to: "/research",
    title: "Research & Medicine",
    keywords: ["research", "medicine", "labs", "case studies", "metrics"],
  },
  {
    to: "/student-life",
    title: "Student Life",
    keywords: ["student", "life", "community", "feed", "clubs"],
  },
  {
    to: "/admissions-aid",
    title: "Admissions & Aid",
    keywords: ["admissions", "admission", "aid", "scholarships", "apply"],
  },
  {
    to: "/transfer",
    title: "Transfer (2+2)",
    keywords: ["transfer", "2+2", "pathway", "abroad"],
  },
  { to: "/news", title: "News", keywords: ["news", "featured", "records", "clips"] },
  {
    to: "/events",
    title: "Events",
    keywords: ["events", "event", "calendar", "upcoming", "current"],
  },
  {
    to: "/faculty",
    title: "Faculty",
    keywords: ["faculty", "directory", "staff", "professors", "professor"],
  },
  {
    to: "/financial-aid",
    title: "Financial Aid",
    keywords: ["financial", "aid", "scholarships", "tuition", "fees"],
  },
  {
    to: "/medical-aid",
    title: "Medical Aid",
    keywords: ["medical", "health", "insurance", "care"],
  },
  {
    to: "/impact",
    title: "Impact & Outreach",
    keywords: ["impact", "outreach", "community", "global"],
  },
  {
    to: "/contact",
    title: "Contact",
    keywords: ["contact", "email", "address", "phone"],
  },
  {
    to: "/portal",
    title: "Student Portal",
    keywords: ["portal", "login", "sign in", "assignments", "grades"],
  },
];

/**
 * Finds the pages whose keywords appear in a free-text query, ranked by
 * the number of keyword hits (ties keep index order).
 */
export function matchRoutes(
  query: string,
  routes: NavRoute[] = NAV_ROUTES,
  limit = 5,
): NavChoice[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return routes
    .map((route, index) => ({
      route,
      index,
      score: route.keywords.filter((k) => q.includes(k)).length,
    }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(({ route }) => ({ label: route.title, to: route.to }));
}
