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
    <aside
      className="w-full h-full flex flex-col py-4 px-2 select-none"
      aria-label="Starting Manual Table of Contents"
    >
      <div className="mb-5 px-2.5">
        <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80 font-mono">
          Starting Manual
        </div>
        <div className="text-sm font-semibold text-foreground mt-0.5 tracking-tight">
          Foundation Curriculum
        </div>
        <div className="text-xs text-muted-foreground mt-1.5 flex items-center justify-between font-mono">
          <span>11 Sections</span>
          <span className="text-[11px] text-foreground/80">
            {completedCount}/{totalCount} Complete
          </span>
        </div>
      </div>

      <nav aria-label="Manual Sections" className="flex-1 space-y-1 overflow-y-auto pr-1">
        {STARTING_MANUAL_SECTIONS.map((section) => {
          const isActive = section.id === currentSectionId;
          const isCompleted = isSectionCompleted(section.slug);
          const href = `${routePrefix}/${section.slug}/`;

          return (
            <Link
              key={section.id}
              href={href}
              onClick={onNavigate}
              className={`group flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] transition-all ${
                isActive
                  ? "bg-foreground text-background font-medium shadow-xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`font-mono text-[11px] shrink-0 ${
                    isActive
                      ? "text-background/80 font-semibold"
                      : isCompleted
                      ? "text-emerald-500 font-medium"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {section.id}
                </span>
                <span className="truncate leading-tight">{section.title}</span>
              </span>

              <span className="flex items-center gap-1.5 shrink-0 ml-2">
                {isCompleted && (
                  <Check
                    className={`size-3.5 ${
                      isActive ? "text-background" : "text-emerald-500"
                    }`}
                    aria-label="Completed"
                  />
                )}
                {section.time && !isCompleted && (
                  <span
                    className={`text-[10.5px] font-mono ${
                      isActive ? "text-background/70" : "text-muted-foreground/50"
                    }`}
                  >
                    {section.time.split(" ")[0]}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 pt-3.5 border-t border-foreground/10 px-2.5">
        <div className="text-xs text-muted-foreground flex items-center justify-between">
          <Link
            href="/home/"
            className="text-muted-foreground hover:text-foreground transition-colors font-mono text-[11.5px]"
          >
            ← Return to Home
          </Link>
          <span className="font-mono text-[10px] text-muted-foreground/60">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
