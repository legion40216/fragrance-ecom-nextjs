import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link href="/" className={buttonVariants({ variant: "outline" })}>
        Click here
      </Link>
    </div>
  );
};

export default NotFound;
