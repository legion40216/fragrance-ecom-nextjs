import Link from "next/link";
import NavDesktop from "../nav-middle/nav-desktop";

export default function NavLeft() {
  return (
    <div className="flex items-center justify-between  gap-4">
      <Link href="/">
        <h1 className="text-2xl font-bold">Fragrance</h1>
      </Link>
    </div>
  );
}
