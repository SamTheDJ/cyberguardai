import { cn } from "@/lib/utils";
import type React from "react";

type SectionHeadingProps = {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  title,
  description,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="flex-shrink-0">{children}</div>}
    </div>
  );
}
