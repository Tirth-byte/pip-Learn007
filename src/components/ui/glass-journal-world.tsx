"use client";

import React from "react";
import { AlertTriangle, FileText, CheckCircle2 } from "lucide-react";

interface GlassJournalWorldProps {
  className?: string;
}

export function GlassJournalWorld({ className = "" }: GlassJournalWorldProps) {
  return (
    <div
      className={`relative w-full max-w-[560px] h-[440px] sm:h-[480px] flex items-center justify-center select-none scale-[0.80] sm:scale-100 origin-center transition-transform ${className}`}
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Warm sunset refraction bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-orange-400/10 to-transparent rounded-3xl blur-3xl -z-10 pointer-events-none transform -rotate-2 scale-95" />

      {/* DIVERGING STATE A: Mental Expectation Slab (Top-Left, floating amber tone) */}
      <div
        className="absolute top-2 left-0 sm:left-4 w-[65%] sm:w-[62%] rounded-2xl p-4 sm:p-5 transition-transform duration-700 ease-out z-10"
        style={{
          transform: "rotate(-5deg) translateZ(10px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(254, 243, 199, 0.50) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 20px 40px -10px rgba(217, 119, 6, 0.15), inset 0 1px 1px white",
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/10">
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-amber-800 dark:text-amber-400">
            EXPECTATION
          </span>
          <span className="text-[10px] font-mono text-amber-700/70">Hypothesis</span>
        </div>
        <p className="font-mono text-[11px] text-amber-950 dark:text-amber-100 italic">
          &ldquo;Dictionary lookup will return None for missing ledger keys.&rdquo;
        </p>
      </div>

      {/* DIVERGING STATE B: System Observation Slab (Top-Right, colliding rose tone) */}
      <div
        className="absolute top-14 right-0 sm:right-4 w-[68%] sm:w-[65%] rounded-2xl p-4 sm:p-5 transition-transform duration-700 ease-out z-20"
        style={{
          transform: "rotate(4deg) translateZ(30px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(254, 226, 226, 0.55) 100%)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 25px 45px -10px rgba(225, 29, 72, 0.18), inset 0 1px 1px white",
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-rose-900/10">
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-rose-700 dark:text-rose-400">
            OBSERVATION (REALITY)
          </span>
          <AlertTriangle className="size-3 text-rose-600" />
        </div>
        <p className="font-mono text-[11px] text-rose-950 dark:text-rose-100 font-semibold">
          KeyError: &apos;account_id&apos; raised at line 42 in parse_tx()
        </p>
      </div>

      {/* RESOLVED SYNTHESIS: The Crystallized Journal Entry Slab (Bottom Foreground) */}
      <div
        className="absolute bottom-2 left-2 sm:left-6 w-[94%] sm:w-[90%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-30"
        style={{
          transform: "rotate(-1deg) translateZ(60px)",
          background:
            "linear-gradient(135deg, rgba(28, 25, 23, 0.90) 0%, rgba(28, 25, 23, 0.78) 100%)",
          backdropFilter: "blur(28px) saturate(190%)",
          WebkitBackdropFilter: "blur(28px) saturate(190%)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.5), 0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FileText className="size-3.5 text-amber-400" />
            <span className="font-mono text-[11px] font-semibold text-slate-200">
              Resolved Journal Artifact
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            <CheckCircle2 className="size-3" />
            EVIDENCE &rarr; LESSON
          </span>
        </div>

        <div className="space-y-2 font-mono text-[11px] sm:text-xs text-slate-200 leading-relaxed">
          <div className="flex items-baseline gap-2">
            <span className="text-amber-400 font-bold uppercase text-[10px]">Cause:</span>
            <span className="text-slate-300">Direct indexing d[k] raises KeyError; d.get(k) returns default.</span>
          </div>
          <div className="flex items-baseline gap-2 pt-1 border-t border-white/5">
            <span className="text-emerald-400 font-bold uppercase text-[10px]">Lesson:</span>
            <span className="text-slate-200">Enforce explicit schema boundary at file ingestion before business logic.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
