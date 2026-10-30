import BestsellersSection from "../sections/bestsellers-section";
import BrandSection from "../sections/brand-section";
import JustArrivedSection from "../sections/featured-section";
import HeroSection from "../sections/hero-section";
import NewsletterSection from "../sections/newsletter-section";
import CollectionsSection from "../sections/notes-section";
import ServicesSection from "../sections/services-section";

export default function HomepageView() {
  return (
    <div className="relative">
      <HeroSection />
      <CollectionsSection />
      <JustArrivedSection />
      <BestsellersSection />
      <BrandSection />
      <ServicesSection />
      <NewsletterSection />
    </div>
  );
}
