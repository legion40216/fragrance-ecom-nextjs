import AuthenticityBanner from "../sections/authenticity-banner";
import BrandSection from "../sections/brand-section";
import CategorySection from "../sections/category-section";
import FeaturedSection from "../sections/featured-section";
import HeroSection from "../sections/hero-section";
import LatestSection from "../sections/latest-section";
import ReviewsSection from "../sections/reviews-section";
import PromoNotice from "../sections/promo-notice";

export default function HomepageView() {
  return (
    <div className="pb-16 md:pb-24">
      <PromoNotice />
      <HeroSection />
      <CategorySection />
      <FeaturedSection />
      <AuthenticityBanner />
      <LatestSection />
      <ReviewsSection />
      <BrandSection />
    </div>
  );
}
