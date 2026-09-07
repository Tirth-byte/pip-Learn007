import React from "react";
import { DocMetadata } from "@/lib/docs/types";
import { Clock } from "lucide-react";

interface DocMetadataBannerProps {
  metadata: DocMetadata;
}

export function DocMetadataBanner({ metadata }: DocMetadataBannerProps) {
  return (
    <header className="mb-7 pb-6 sm:mb-9 sm:pb-7 border-b border-border/70">
      {/* Top metadata row: Section badge & time */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground mb-2.5">
        <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[11px] bg-primary/10 text-primary font-medium dark:bg-primary/15">
          Section {metadata.section}
        </span>
        <span className="text-muted-foreground/40 select-none">•</span>
        <span className="inline-flex items-center gap-1 text-muted-foreground/80 font-mono text-[11px]">
          <Clock className="h-3 w-3" />
          <span>{metadata.estimated_time}</span>
        </span>
      </div>

      {/* Main Title: Strong Presence */}
      <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-foreground leading-[1.15] mb-5">
        {metadata.title}
      </h1>

      {/* Prerequisites & Outcomes: Visually Secondary */}
      <div className="space-y-3 text-sm">
        {metadata.prerequisites && (
          <div className="text-[13px] text-muted-foreground/90 leading-relaxed">
            <span className="font-semibold text-foreground/90 mr-1.5">Prerequisites:</span>
            <span>{metadata.prerequisites}</span>
          </div>
        )}

        {metadata.outcomes && metadata.outcomes.length > 0 && (
          <div className="pt-1">
            <div className="text-[10.5px] font-semibold uppercase tracking-wider text-muted-foreground/75 mb-1.5">
              Key Outcomes
            </div>
            <ul className="space-y-1 text-[12.5px] sm:text-[13px] text-muted-foreground/90">
              {metadata.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-primary/70 mt-0.5 shrink-0 text-[10px] select-none">
                    •
                  </span>
                  <span className="leading-snug">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
