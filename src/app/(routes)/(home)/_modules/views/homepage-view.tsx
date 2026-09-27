import HeroSection from "../sections/hero-section";
import CategorySection from "../sections/category-section";
import FeaturedSection from "../sections/featured-section";
import BrandSection from "../sections/brand-section";

export default function HomepageView() {
  return (
    <div className="space-y-20 pb-16 md:space-y-28 md:pb-24">
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <BrandSection />
    </div>
  );
}
