import "./global.css";

import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import Protected from "@/components/auth/Protected";
import SiteLayout from "@/components/layout/SiteLayout";
import ScrollToTop from "@/components/layout/ScrollToTop";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import PageLoader from "@/components/feedback/PageLoader";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { appRoutes } from "@/routes";

function AppRoutes() {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary resetKey={pathname}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          {appRoutes.map(({ path, Component, protected: isProtected }) => (
            <Route
              key={path}
              path={path}
              element={
                isProtected ? (
                  <Protected>
                    <Component />
                  </Protected>
                ) : (
                  <Component />
                )
              }
            />
          ))}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ScrollToTop />
          <Toaster />
          <SiteLayout>
            <AppRoutes />
          </SiteLayout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");
createRoot(container).render(<App />);
