import HomepageView from "./_modules/views/homepage-view";
import { getValidatedSearchParams } from "@/utils/parseSearchParams";
import { redirect } from "next/navigation";

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const rawSearchParams = await props.searchParams;
  const validatedParams = getValidatedSearchParams(rawSearchParams);

  const rawCategory =
    typeof rawSearchParams.category === "string"
      ? rawSearchParams.category
      : undefined;

  // Bad/unknown category in the URL -> send them to a clean URL instead of
  // silently rendering "all products" at a broken-looking link
  if (rawCategory && rawCategory !== validatedParams.category) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <HomepageView categoryParam={validatedParams.category} />
    </div>
  );
}