"use client";

import React from "react";
import { Users, Shield } from "lucide-react";

interface GlassMentorsWorldProps {
  className?: string;
}

export function GlassMentorsWorld({ className = "" }: GlassMentorsWorldProps) {
  return (
    <div
      className={`relative w-full max-w-[560px] h-[440px] sm:h-[480px] flex items-center justify-center select-none scale-[0.80] sm:scale-100 origin-center transition-transform ${className}`}
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Dusk purple twilight reflection bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/25 via-indigo-500/15 to-transparent rounded-3xl blur-3xl -z-10 pointer-events-none transform rotate-3 scale-95" />

      {/* STAGE 1: Code Verification Gate (Top Layer) */}
      <div
        className="absolute top-2 left-0 sm:left-4 w-[76%] sm:w-[72%] rounded-2xl p-4 sm:p-5 transition-transform duration-700 ease-out z-10"
        style={{
          transform: "rotate(-4deg) translateZ(0px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.82) 0%, rgba(245, 243, 255, 0.50) 100%)",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 20px 40px -10px rgba(126, 34, 206, 0.15), inset 0 1px 1px white",
        }}
      >
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-purple-900/10">
          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-purple-900 dark:text-purple-300">
            STAGE 1 · AUTOMATED VERIFICATION
          </span>
          <span className="text-[10px] font-mono text-emerald-700 font-semibold">[PASS]</span>
        </div>
        <p className="font-mono text-[11px] text-slate-700 dark:text-slate-300">
          All behavioral test cases verified. Milestone locked awaiting human calibration.
        </p>
      </div>

      {/* STAGE 2: Human Calibration Interruption Gate (Center floating layer) */}
      <div
        className="absolute top-[28%] right-0 sm:right-4 w-[82%] sm:w-[78%] rounded-2xl p-4 sm:p-5 transition-transform duration-700 ease-out z-20"
        style={{
          transform: "rotate(3deg) translateZ(35px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(238, 242, 255, 0.70) 100%)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 25px 50px -12px rgba(99, 102, 241, 0.25), inset 0 1px 1px white",
        }}
      >
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-indigo-900/10">
          <div className="flex items-center gap-2">
            <Users className="size-3.5 text-indigo-600" />
            <span className="font-mono text-[11px] font-bold text-indigo-950 uppercase tracking-wider">
              HUMAN DEFENSE REQUIRED
            </span>
          </div>
          <span className="size-2 rounded-full bg-indigo-500 animate-pulse" />
        </div>
        <div className="font-mono text-[11px] text-slate-700 space-y-1">
          <div className="flex items-center gap-2 text-indigo-900 font-semibold">
            <span>Calibrators:</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px]">Tirth</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px]">Darsh</span>
            <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px]">Raj</span>
          </div>
          <p className="text-[10px] text-slate-500 italic">Defend edge-case resilience &amp; architectural choices live.</p>
        </div>
      </div>

      {/* STAGE 3: Calibration Clearance Slab (Bottom Foreground) */}
      <div
        className="absolute bottom-2 left-2 sm:left-6 w-[94%] sm:w-[90%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-30"
        style={{
          transform: "rotate(-1.5deg) translateZ(65px)",
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.74) 100%)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.45), 0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="size-3.5 text-purple-400" />
            <span className="font-mono text-[11px] font-semibold text-slate-200">
              Calibration Protocol Cleared
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
            ADVANCE UNLOCKED
          </span>
        </div>
        <div className="font-mono text-[11px] sm:text-xs text-slate-200 space-y-1">
          <p className="text-slate-400">BUILD &rarr; DEFEND &rarr; CALIBRATE &rarr; CONTINUE</p>
          <p className="text-emerald-400 font-medium">Checkpoint status: Verified with calibrated mental model</p>
        </div>
      </div>
    </div>
  );
}
