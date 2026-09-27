import BrandSection from "../sections/brand-section";
import CategorySection from "../sections/category-section";
import FeaturedSection from "../sections/featured-section";
import HeroSection from "../sections/hero-section";
import LatestSection from "../sections/latest-section";
import TrustSection from "../sections/trust-section";

export default function HomepageView() {
  return (
    <div className="pb-16 md:pb-24">
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <TrustSection />
      <LatestSection />
      <BrandSection />
    </div>
  );
}
