import MainSection from "../sections/main-section";
import { CategorySlug } from "@/schema";

export default function HomepageView({
  categoryParam,
}: {
  categoryParam: CategorySlug;
}) {
  return <MainSection categoryParam={categoryParam} />;
}