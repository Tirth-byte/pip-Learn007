"use client";

import React from "react";
import Link from "next/link";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";

interface DocSidebarProps {
  currentSectionId: string;
  onNavigate?: () => void;
}

export function DocSidebar({ currentSectionId, onNavigate }: DocSidebarProps) {
  return (
    <aside className="w-full h-full flex flex-col py-5 px-3 select-none">
      <div className="mb-4 px-2">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/75">
          Curriculum
        </div>
        <div className="text-[13px] font-semibold text-foreground mt-0.5">
          Python Starting Manual
        </div>
        <div className="text-[11.5px] text-muted-foreground/70 mt-0.5">
          60–90 min Foundation
        </div>
      </div>

      <nav aria-label="Manual Sections" className="flex-1 space-y-0.5 overflow-y-auto pr-1">
        {STARTING_MANUAL_SECTIONS.map((section) => {
          const isActive = section.id === currentSectionId;
          const isAvailable = section.status === "available";

          if (isAvailable) {
            return (
              <Link
                key={section.id}
                href={`/learn/python/${section.slug}`}
                onClick={onNavigate}
                className={`group flex items-center justify-between rounded-md px-2 py-1.5 text-[12.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary dark:bg-primary/15 font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex items-center gap-2 truncate">
                  <span
                    className={`font-mono text-[11px] ${
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {section.id}
                  </span>
                  <span className="truncate">{section.title}</span>
                </span>
                {section.time && (
                  <span className="text-[10px] text-muted-foreground/75 font-normal shrink-0 ml-1">
                    {section.time}
                  </span>
                )}
              </Link>
            );
          }

          return (
            <div
              key={section.id}
              className="flex items-center justify-between rounded-md px-2 py-1.5 text-[12.5px] text-muted-foreground/75 dark:text-muted-foreground/70 cursor-default select-none"
              title={`${section.title} (Available in upcoming update)`}
            >
              <span className="flex items-center gap-2 truncate">
                <span className="font-mono text-[11px] text-muted-foreground/50">
                  {section.id}
                </span>
                <span className="truncate">{section.title}</span>
              </span>
              {section.time && (
                <span className="text-[10px] text-muted-foreground/50 font-normal shrink-0 ml-1">
                  {section.time}
                </span>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-5 pt-3 border-t border-border px-2">
        <div className="text-[11px] text-muted-foreground/75 leading-normal">
          Section 04 is currently available. Subsequent sections unlock progressively.
        </div>
      </div>
    </aside>
  );
}
