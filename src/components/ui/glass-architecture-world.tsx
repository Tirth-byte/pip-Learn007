"use client";

import React from "react";
import { FileSpreadsheet, ShieldCheck, HardDrive } from "lucide-react";

interface GlassArchitectureWorldProps {
  className?: string;
}

export function GlassArchitectureWorld({ className = "" }: GlassArchitectureWorldProps) {
  return (
    <div
      className={`relative w-full max-w-[580px] h-[460px] sm:h-[500px] flex items-center justify-center select-none scale-[0.80] sm:scale-100 origin-center transition-transform ${className}`}
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Environmental reflection bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-teal-400/10 to-transparent rounded-3xl blur-3xl -z-10 pointer-events-none transform rotate-2 scale-95" />

      {/* LAYER 1: Raw Ledger Data Ingestion Slab (Top-Left) */}
      <div
        className="absolute top-2 left-0 sm:left-2 w-[84%] sm:w-[80%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-10"
        style={{
          transform: "rotate(-4deg) translateZ(0px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.78) 0%, rgba(255, 255, 255, 0.45) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 4px 16px -2px rgba(15, 23, 42, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 1)",
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.08] dark:border-white/[0.12]">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="size-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-100">
              data/ledger_tx.raw
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold">
            INGESTION LAYER
          </span>
        </div>
        <div className="font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-300 space-y-1">
          <p className="text-slate-400 dark:text-slate-500">2026-03-12,TX-801,CREDIT,450.00,SALARY</p>
          <p className="text-slate-700 dark:text-slate-200">2026-03-14,TX-802,DEBIT,85.20,INFRASTRUCTURE</p>
          <p className="text-slate-700 dark:text-slate-200">2026-03-15,TX-803,DEBIT,120.00,OFFICE_EQUIP</p>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] italic">... 8,420 historical ledger records streaming</p>
        </div>
      </div>

      {/* LAYER 2: Defensive State & Logic Core (Middle Connector Slab) */}
      <div
        className="absolute top-[34%] right-2 sm:right-6 w-[70%] sm:w-[68%] rounded-xl p-4 transition-transform duration-700 ease-out z-20"
        style={{
          transform: "rotate(3deg) translateZ(35px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.70) 100%)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 20px 40px -10px rgba(16, 185, 129, 0.25), 0 4px 12px rgba(0, 0, 0, 0.04), inset 0 1px 1px white",
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-black/[0.06]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-teal-600" />
            <span className="font-mono text-[10px] font-bold text-slate-800 tracking-wider uppercase">
              DEFENSIVE ENGINE
            </span>
          </div>
          <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
        <div className="font-mono text-[10px] text-slate-700 space-y-0.5">
          <p className="font-semibold text-emerald-800">assert balance &gt;= 0.0</p>
          <p className="text-slate-500">sanitize_input(entry) &rarr; SHA-256 state seal</p>
        </div>
      </div>

      {/* LAYER 3: Physical Persistence & Output Slab (Bottom Foreground) */}
      <div
        className="absolute bottom-2 left-4 sm:left-8 w-[92%] sm:w-[88%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-30"
        style={{
          transform: "rotate(-1deg) translateZ(70px)",
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.75) 100%)",
          backdropFilter: "blur(30px) saturate(200%)",
          WebkitBackdropFilter: "blur(30px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.45), 0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HardDrive className="size-3.5 text-emerald-400" />
            <span className="font-mono text-[11px] font-medium text-slate-300">
              persistence/ledger_store.json
            </span>
          </div>
          <span className="font-mono text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
            ATOMIC WRITE VERIFIED
          </span>
        </div>
        <div className="font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 text-slate-200">
          <p className="text-slate-400">
            &#123; <span className="text-emerald-400">&quot;version&quot;</span>: 1, <span className="text-emerald-400">&quot;sealed&quot;</span>: true, <span className="text-emerald-400">&quot;tx_count&quot;</span>: 8420 &#125;
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-white/5 text-slate-300 text-[11px]">
            <span className="text-teal-300">Architecture Phase 01 &rarr; 09 Linked</span>
            <span className="text-emerald-400 font-mono font-medium">9/9 Milestones Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}
