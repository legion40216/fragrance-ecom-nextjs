import Link from "next/link";
import NavGroup from "./nav-left/nav-group";

export default function NavLeft() {
  return (
    <div className="flex items-center gap-4">
      <Link className="hidden sm:block" href="/">
        <h1 className="text-2xl font-bold">Fragrance</h1>
      </Link>

      <NavGroup />
    </div>
  );
}