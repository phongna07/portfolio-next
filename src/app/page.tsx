import AboutSection from "../components/AboutSection";
import ContactSection from "../components/ContactSection";
import ProjectList from "../components/ProjectList";
import SiteHeader from "../components/SiteHeader";
import TechnicalSkills from "../components/TechnicalSkills";

export default function HomePage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <span id="top" aria-hidden="true" />
        <AboutSection />
        <ProjectList />
        <TechnicalSkills />
        <ContactSection />
      </main>
    </div>
  );
}
