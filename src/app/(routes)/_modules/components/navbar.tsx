import NavLeft from "./navbar/nav-left";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between">
      <NavLeft />

      <Button>
        Contact Us
      </Button>
    </div>
  );
}