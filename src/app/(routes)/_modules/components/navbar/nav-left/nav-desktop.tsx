"use client";

import NavLinks from "@/components/global-ui/nav-links";
import { useNavRoutes } from "./nav-routes";

export default function NavDesktop() {
  const routes = useNavRoutes();

  return (
    <nav className="hidden items-center gap-6 md:flex">
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
  );
}
