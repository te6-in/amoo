"use client";

import { j } from "@te6/ui";

// FIXME: why this should be a client-side component?

interface DividerWithLabelProps {
  text?: string;
  className?: string;
}

export function DividerWithLabel({ text, className }: DividerWithLabelProps) {
  return (
    <div className="relative">
      <hr className="border-neutral-200 dark:border-neutral-800" />
      <span
        className={j(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs font-semibold text-neutral-400",
          className ?? "bg-body dark:bg-body-dark",
        )}
      >
        {text ?? "또는"}
      </span>
    </div>
  );
}
