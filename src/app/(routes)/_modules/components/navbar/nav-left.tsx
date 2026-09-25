import Link from "next/link";

import NavDesktop from "./nav-left/nav-desktop";
import NavMobile from "./nav-left/nav-mobile";

export default function NavLeft() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Fragrance</h1>
      </Link>

      <NavDesktop />
      <NavMobile />
    </div>
  );
}
