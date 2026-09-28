"use client";

import { cn } from "cn";
import Link from "next/link";
import React, { type ReactNode } from "react";

interface NavLinksProps {
  routeActive?: boolean;
  routeHref: string;
  routeLabel: string;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

export default function NavLinks({
  routeActive,
  routeHref,
  routeLabel,
  activeClassName,
  inactiveClassName,
  className,
  children,
  onClick,
}: NavLinksProps) {
  return (
    <Link
      href={routeHref}
      className={cn(
        "transition-colors",
        routeActive ? activeClassName : inactiveClassName,
        className,
      )}
      onClick={onClick}
    >
      {children ?? routeLabel}
    </Link>
  );
}
