"use client";

import React from "react";
import Link from "next/link";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";
import { useManualProgress } from "@/learning-state/manual-progress";
import { Check } from "lucide-react";

interface DocSidebarProps {
  currentSectionId: string;
  onNavigate?: () => void;
  routePrefix?: string; // Default is "/manual"
}

export function DocSidebar({
  currentSectionId,
  onNavigate,
  routePrefix = "/manual",
}: DocSidebarProps) {
  const { isSectionCompleted, completedCount, totalCount } = useManualProgress();

  return (
    <aside className="w-full h-full flex flex-col py-5 px-3 select-none" aria-label="Starting Manual Table of Contents">
      <div className="mb-4 px-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/75 font-mono">
          Foundation Curriculum
        </div>
        <div className="text-[13px] font-semibold text-foreground mt-0.5">
          Python Starting Manual
        </div>
        <div className="text-[11.5px] text-muted-foreground/70 mt-0.5 flex items-center justify-between">
          <span>11 Foundational Sections</span>
          <span className="font-mono text-[10.5px]">
            {completedCount}/{totalCount} Done
          </span>
        </div>
      </div>

      <nav aria-label="Manual Sections" className="flex-1 space-y-0.5 overflow-y-auto pr-1">
        {STARTING_MANUAL_SECTIONS.map((section) => {
          const isActive = section.id === currentSectionId;
          const isCompleted = isSectionCompleted(section.slug);
          const href = `${routePrefix}/${section.slug}/`;

          return (
            <Link
              key={section.id}
              href={href}
              onClick={onNavigate}
              className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-[12.5px] transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary dark:bg-primary/15 font-semibold"
                  : "text-foreground hover:bg-muted"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex items-center gap-2 truncate">
                <span
                  className={`font-mono text-[11px] shrink-0 ${
                    isActive
                      ? "text-primary font-semibold"
                      : isCompleted
                      ? "text-emerald-600 dark:text-emerald-400 font-medium"
                      : "text-muted-foreground/70"
                  }`}
                >
                  {section.id}
                </span>
                <span className="truncate">{section.title}</span>
              </span>

              <span className="flex items-center gap-1 shrink-0 ml-1">
                {isCompleted && (
                  <Check
                    className="size-3 text-emerald-600 dark:text-emerald-400"
                    aria-label="Completed"
                  />
                )}
                {section.time && !isCompleted && (
                  <span className="text-[10px] text-muted-foreground/60 font-mono">
                    {section.time.split(" ")[0]}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 pt-3 border-t border-border px-2">
        <div className="text-[11px] text-muted-foreground/75 leading-normal flex items-center justify-between">
          <Link
            href="/home/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Return to Home
          </Link>
          <span className="font-mono text-[10px] text-muted-foreground/60">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
