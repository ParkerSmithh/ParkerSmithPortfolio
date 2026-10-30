import { MotionConfig } from "motion/react";
import { AboutEducation } from "./components/AboutEducation";
import { Contact } from "./components/Contact";
import { CybercabHunter } from "./components/CybercabHunter";
import { Footer } from "./components/Footer";
import { FortniteShowcase } from "./components/FortniteShowcase";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { ProjectsOverview } from "./components/ProjectsOverview";
import { ScrollProgress } from "./components/ScrollProgress";
import { Skills } from "./components/Skills";
import { VideoPlayerProvider } from "./components/VideoPlayerProvider";
import { YouTubeShowcase } from "./components/YouTubeShowcase";

export default function App() {
  return (
    // reducedMotion="user": transform/layout animations are skipped for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <VideoPlayerProvider>
        <ScrollProgress />
        <Navigation />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <AboutEducation />
          <ProjectsOverview />
          <YouTubeShowcase />
          <FortniteShowcase />
          <CybercabHunter />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </VideoPlayerProvider>
    </MotionConfig>
  );
}
