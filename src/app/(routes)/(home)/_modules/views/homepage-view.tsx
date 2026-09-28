import { display, body } from "../fonts";
import HeroSection from "../sections/hero-section";
import CategorySection from "../sections/category-section";
import FeaturedSection from "../sections/featured-section";
import BrandSection from "../sections/brand-section";

export default function HomepageView() {
  return (
    <div
      className={`${display.variable} ${body.variable} my-6 overflow-hidden
        rounded-3xl font-[family-name:var(--font-body)] text-[#1F1712]`}
    >
      <HeroSection />

      <div
        className="space-y-24 bg-[linear-gradient(to_bottom,#E9EEEA,#E7CFC8_8rem)]
          px-6 pb-24 pt-24 md:px-14"
      >
        <CategorySection />
        <FeaturedSection />
      </div>

      <BrandSection />
    </div>
  );
}
