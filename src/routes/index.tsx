import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";

import { WelcomeHero } from "@/components/welcome-hero";
import { TopicCarousel } from "@/components/topic-carousel";
import { PartnershipsSection } from "@/components/partnerships-section";
import { SiteHeader } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const scrollToTopics = useCallback(() => {
    const el = document.getElementById("topics");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <WelcomeHero onGetStarted={scrollToTopics} />
        <TopicCarousel />
        <PartnershipsSection />
      </main>
    </div>
  );
}
