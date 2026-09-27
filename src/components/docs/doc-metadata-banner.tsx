import React from "react";
import { DocMetadata } from "@/lib/docs/types";
import { Clock } from "lucide-react";

interface DocMetadataBannerProps {
  metadata: DocMetadata;
}

export function DocMetadataBanner({ metadata }: DocMetadataBannerProps) {
  return (
    <header className="mb-10 pb-8 border-b border-foreground/10">
      {/* Top editorial eyebrow */}
      <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
        <span className="font-mono text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground">
          Section {metadata.section} / 11
        </span>
        <span className="text-foreground/20 select-none">•</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground font-mono text-[11px]">
          <Clock className="size-3.5 text-muted-foreground/70" />
          <span>{metadata.estimated_time}</span>
        </span>
      </div>

      {/* Main Title: Editorial Scale */}
      <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-semibold tracking-[-0.035em] text-foreground leading-[1.14] mb-6 text-balance">
        {metadata.title}
      </h1>

      {/* Prerequisites & Outcomes: Restrained Editorial Brief */}
      <div className="space-y-4 text-sm max-w-2xl">
        {metadata.prerequisites && (
          <div className="text-[13px] sm:text-[13.5px] text-muted-foreground leading-relaxed flex items-baseline gap-2">
            <span className="font-semibold text-foreground/90 shrink-0 font-mono text-[11.5px] uppercase tracking-wider">
              Prerequisites:
            </span>
            <span>{metadata.prerequisites}</span>
          </div>
        )}

        {metadata.outcomes && metadata.outcomes.length > 0 && (
          <div className="pt-2">
            <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-muted-foreground mb-2">
              Key Outcomes
            </div>
            <ul className="space-y-1.5 text-[13px] sm:text-[13.5px] text-muted-foreground/95">
              {metadata.outcomes.map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-foreground/40 mt-1 shrink-0 text-[10px] select-none">
                    —
                  </span>
                  <span className="leading-relaxed">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
