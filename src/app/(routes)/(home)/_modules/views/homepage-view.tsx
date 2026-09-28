import HeroSection from "../sections/hero-section";
import NotesSection from "../sections/notes-section";
import BaseSection from "../sections/base-section";
import ScentRail from "../components/scent-rail";

export default function HomepageView() {
  return (
    <div className="relative">
      <ScentRail />
      <HeroSection />
      <NotesSection />
      <BaseSection />
    </div>
  );
}
