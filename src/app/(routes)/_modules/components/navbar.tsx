import { Button } from "@/components/ui/button";
import NavLeft from "./navbar/nav-left/nav-left";
import NavMiddle from "./navbar/nav-middle";
import NavMobile from "./navbar/nav-mobile";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between py-0 md:py-2">
      <NavLeft />

      <NavMiddle />

      <NavMobile />
      <Button className="hidden md:inline-flex">Contact Us</Button>
    </div>
  );
}
