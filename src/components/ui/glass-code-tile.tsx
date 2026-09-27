"use client";

import React from "react";

export interface GlassCodeTileProps {
  filename?: string;
  badge?: string;
  code?: string;
  rotation?: string; // e.g. "-rotate-6", "rotate-3", etc.
  theme?: "sky" | "indigo" | "violet" | "amber" | "emerald" | "slate";
  floatAnimation?: "slow" | "reverse" | "none";
  hasCursor?: boolean;
  hasBraces?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function GlassCodeTile({
  filename = "ledger.py",
  badge,
  code,
  rotation = "-rotate-3",
  theme = "sky",
  floatAnimation = "none",
  hasCursor = false,
  hasBraces = false,
  className = "",
  style,
}: GlassCodeTileProps) {
  const themeColors = {
    sky: {
      dot: "bg-sky-400",
      tag: "text-sky-600 dark:text-sky-400",
      bar1: "bg-sky-500/35",
      bar2: "bg-blue-500/25",
      border: "rgba(56, 189, 248, 0.3)",
      glow: "rgba(56, 189, 248, 0.08)",
    },
    indigo: {
      dot: "bg-indigo-400",
      tag: "text-indigo-600 dark:text-indigo-400",
      bar1: "bg-indigo-500/35",
      bar2: "bg-violet-500/25",
      border: "rgba(99, 102, 241, 0.3)",
      glow: "rgba(99, 102, 241, 0.08)",
    },
    violet: {
      dot: "bg-violet-400",
      tag: "text-violet-600 dark:text-violet-400",
      bar1: "bg-violet-500/35",
      bar2: "bg-purple-500/25",
      border: "rgba(168, 85, 247, 0.3)",
      glow: "rgba(168, 85, 247, 0.08)",
    },
    amber: {
      dot: "bg-amber-400",
      tag: "text-amber-600 dark:text-amber-400",
      bar1: "bg-amber-500/35",
      bar2: "bg-orange-500/25",
      border: "rgba(245, 158, 11, 0.3)",
      glow: "rgba(245, 158, 11, 0.08)",
    },
    emerald: {
      dot: "bg-emerald-400",
      tag: "text-emerald-600 dark:text-emerald-400",
      bar1: "bg-emerald-500/35",
      bar2: "bg-teal-500/25",
      border: "rgba(16, 185, 129, 0.3)",
      glow: "rgba(16, 185, 129, 0.08)",
    },
    slate: {
      dot: "bg-slate-400",
      tag: "text-slate-600 dark:text-slate-400",
      bar1: "bg-slate-500/35",
      bar2: "bg-gray-500/25",
      border: "rgba(148, 163, 184, 0.3)",
      glow: "rgba(148, 163, 184, 0.08)",
    },
  };

  const activeTheme = themeColors[theme as keyof typeof themeColors] || themeColors.sky;

  const animationClass =
    floatAnimation === "slow"
      ? "auth-float-slow"
      : floatAnimation === "reverse"
      ? "auth-float-reverse"
      : "";

  return (
    <div
      className={`auth-glass-tile ${rotation} ${animationClass} ${className}`}
      style={{
        ...style,
        boxShadow: style?.boxShadow,
      }}
      aria-hidden="true"
    >
      {/* Top Window Bar */}
      <div className="flex items-center justify-between gap-4 mb-3 pb-2.5 border-b border-black/[0.06] dark:border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-amber-400/80" />
          <span className={`size-2 rounded-full ${activeTheme.dot} opacity-90`} />
        </div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-foreground/5 text-muted-foreground">
              {badge}
            </span>
          )}
          <span className={`font-mono text-[11px] font-medium tracking-tight ${activeTheme.tag}`}>
            {filename}
          </span>
        </div>
      </div>

      {/* Code Snippet or Abstract Skeleton Layers */}
      {code ? (
        <pre className="font-mono text-[10.5px] leading-relaxed text-foreground/75 overflow-hidden whitespace-pre font-normal select-none">
          <code>{code}</code>
        </pre>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center gap-1.5">
            {hasBraces && (
              <span className="font-mono text-[11px] font-bold text-foreground/40 mr-1 select-none">
                {"{"}
              </span>
            )}
            <div className={`h-1.5 w-10 rounded-full ${activeTheme.bar1}`} />
            <div className="h-1.5 w-20 rounded-full bg-foreground/20" />
            <div className="h-1.5 w-14 rounded-full bg-foreground/10" />
          </div>
          <div className="flex items-center gap-1.5 pl-4">
            <div className="h-1.5 w-16 rounded-full bg-foreground/25" />
            <div className={`h-1.5 w-24 rounded-full ${activeTheme.bar2}`} />
          </div>
          <div className="flex items-center gap-1.5 pl-7">
            <div className="h-1.5 w-28 rounded-full bg-foreground/15" />
            {hasCursor && (
              <span className="inline-block size-1.5 bg-primary rounded-full animate-pulse ml-1" />
            )}
          </div>
          <div className="flex items-center gap-1.5 pl-4">
            <div className={`h-1.5 w-12 rounded-full ${activeTheme.bar1}`} />
            <div className="h-1.5 w-16 rounded-full bg-foreground/20" />
          </div>
          {hasBraces && (
            <div className="flex items-center">
              <span className="font-mono text-[11px] font-bold text-foreground/40 select-none">
                {"}"}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
