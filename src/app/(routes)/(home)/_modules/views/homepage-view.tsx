import BrandSection from "../sections/brand-section";
import CategorySection from "../sections/category-section";
import FeaturedSection from "../sections/featured-section";
import HeroSection from "../sections/hero-section";

export default function HomepageView() {
  return (
    <div className="space-y-20 py-10 md:space-y-28">
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <BrandSection />
    </div>
  );
}
