"use client";

import { Menu, X } from "lucide-react";

import NavLinks from "@/components/global-ui/nav-links";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavRoutes } from "./nav-routes";

export default function NavMobile() {
  const routes = useNavRoutes();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Open navigation">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="p-3 [&>button]:hidden">
          <SheetTitle className="sr-only">Fragrance Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigation menu for Fragrance
          </SheetDescription>

          <div className="flex h-full flex-col justify-between">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Fragrance</h2>

                <SheetClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Close navigation"
                  >
                    <X className="size-5" />
                  </Button>
                </SheetClose>
              </div>

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

            <Button className="w-full">Contact Us</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
