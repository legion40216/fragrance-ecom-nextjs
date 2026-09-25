"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

import { navLinks } from "@/data/links";
import NavLinks from "@/components/global-ui/nav-links";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export function useNavRoutes() {
  const pathname = usePathname();

  return navLinks.map((link) => ({
    ...link,
    active:
      pathname === link.href ||
      (link.href !== "/" && pathname.startsWith(link.href + "/")),
  }));
}

export default function NavGroup() {
  const routes = useNavRoutes();

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <NavLinks
            key={route.href}
            routeActive={route.active}
            routeHref={route.href}
            routeLabel={route.label}
            activeClassName="font-medium"
            inactiveClassName="text-muted-foreground hover:text-foreground"
          />
        ))}
      </nav>

      {/* Mobile */}
      <div className="md:hidden">
        <Sheet>
          {/* Open button */}
          <SheetTrigger>
              <Menu className="size-5" />
          </SheetTrigger>

          {/* Mobile drawer */}
          <SheetContent side="left" className="p-3 [&>button]:hidden">
            <SheetTitle className="sr-only">Fragrance Navigation</SheetTitle>

            <SheetDescription className="sr-only">
              Navigation menu for Fragrance
            </SheetDescription>

            <div className="flex h-full flex-col justify-between">
              {/* Top section */}
              <div className="grid gap-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Fragrance</h2>

                  <SheetClose>
                      <X className="size-5" />
                  </SheetClose>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <NavLinks
                      key={route.href}
                      routeActive={route.active}
                      routeHref={route.href}
                      routeLabel={route.label}
                      className="border-b py-3"
                      activeClassName="font-semibold"
                      inactiveClassName="text-muted-foreground"
                    />
                  ))}
                </nav>
              </div>

              {/* Bottom section */}
              <div>
                <Button className="w-full">Contact Us</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
