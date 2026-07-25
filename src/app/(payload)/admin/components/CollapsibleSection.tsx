"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_PREFIX = "visf-admin-dashboard-collapse:";

type CollapsibleSectionProps = {
  title: string;
  storageKey: string;
  headingLevel?: "h2" | "h3";
  defaultOpen?: boolean;
  children: ReactNode;
};

export function CollapsibleSection({
  title,
  storageKey,
  headingLevel = "h2",
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const Heading = headingLevel;

  // Always render `defaultOpen` on the first pass so server and client HTML
  // match, then reconcile against localStorage once mounted in the browser.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_PREFIX + storageKey);
    if (stored !== null) setOpen(stored === "true");
  }, [storageKey]);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_PREFIX + storageKey, String(next));
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex items-center gap-2 text-left w-full cursor-pointer bg-transparent border-0 p-0"
      >
        <span
          className="inline-block transition-transform duration-150 text-xs opacity-70"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          ▶
        </span>
        <Heading className="m-0">{title}</Heading>
      </button>
      {open && children}
    </div>
  );
}
