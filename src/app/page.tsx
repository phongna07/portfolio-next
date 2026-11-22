import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import HeroSection from "../components/HeroSection";
import ProjectList from "../components/ProjectList";
import SignalBus from "../components/SignalBus";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import TechnicalSkills from "../components/TechnicalSkills";

export default function HomePage() {
  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <span id="top" aria-hidden="true" />
        <HeroSection />
        <SignalBus />
        <AboutSection />
        <ProjectList />
        <TechnicalSkills />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
