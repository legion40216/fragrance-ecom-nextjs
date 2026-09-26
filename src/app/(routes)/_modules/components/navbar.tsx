import NavLeft from "./navbar/nav-left";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <NavLeft />

      <Button className="hidden md:inline-flex">
        Contact Us
      </Button>
    </div>
  );
}