"use client";
import type React from "react";

export default function EmptyState({
  title = "",
  subtitle = "",
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <p className="text-2xl font-bold">{title}</p>
        <p className="font-light text-neutral-500">{subtitle}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}
