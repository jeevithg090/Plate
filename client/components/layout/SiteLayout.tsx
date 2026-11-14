import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";
import AiNavBot from "@/components/ai/AiNavBot";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div id="main" tabIndex={-1} className="relative outline-none">
        {children}
      </div>
      <Footer />
      <AiNavBot />
    </div>
  );
}
