"use client";

import { House, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "cn";
import Cart from "./navbar/nav-right/cart";
import Wishlist from "./navbar/nav-right/wishlist";

const navItems = [
  { href: "/", label: "Home", icon: House },
  { href: "/products", label: "Shop", icon: ShoppingBag },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 min-h-[4.75rem] border-t bg-background/95 px-2 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-1.5 shadow-[0_-4px_16px_-12px_rgba(0,0,0,0.35)] backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-around gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-lg text-[11px] font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.25 : 1.75} />
              <span>{label}</span>
            </Link>
          );
        })}

        <Wishlist mobile />

        <Cart mobile />
      </div>
    </nav>
  );
}
