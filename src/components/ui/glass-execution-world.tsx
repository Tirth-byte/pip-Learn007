"use client";

import React from "react";
import { Terminal, Cpu, Check } from "lucide-react";

interface GlassExecutionWorldProps {
  mode?: "manual" | "project";
  className?: string;
}

export function GlassExecutionWorld({
  mode = "manual",
  className = "",
}: GlassExecutionWorldProps) {
  return (
    <div
      className={`relative w-full max-w-[560px] h-[440px] sm:h-[480px] lg:h-[500px] flex items-center justify-center select-none scale-[0.80] sm:scale-100 origin-center transition-transform ${className}`}
      style={{ perspective: 1200 }}
      aria-hidden="true"
    >
      {/* Ambient optical refraction / backdrop bloom */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-cyan-300/10 to-transparent rounded-3xl blur-3xl -z-10 pointer-events-none transform -rotate-3 scale-95" />

      {/* LAYER 1: Translucent Source-Code Slab (Back Layer, tilted slightly) */}
      <div
        className="absolute top-0 left-0 sm:left-2 w-[85%] sm:w-[82%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-10"
        style={{
          transform: "rotate(-3deg) translateZ(0px) translateY(0px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.40) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 4px 16px -2px rgba(15, 23, 42, 0.05), inset 0 1px 1px 0 rgba(255, 255, 255, 1)",
        }}
      >
        {/* Source Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.08] dark:border-white/[0.12]">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-rose-400/80" />
            <span className="size-2.5 rounded-full bg-amber-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
            <span className="ml-2 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200">
              {mode === "project" ? "ledger/core.py" : "runtime/execute.py"}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-300 font-medium">
            SOURCE
          </span>
        </div>

        {/* Source Code Lines */}
        <div className="font-mono text-[11px] sm:text-xs leading-relaxed text-slate-800 dark:text-slate-100 space-y-1">
          <p className="text-slate-400 dark:text-slate-500"># Parse raw transaction &amp; enforce bounds</p>
          <p>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">def</span>{" "}
            <span className="text-sky-700 dark:text-sky-300 font-medium">process_record</span>(
            <span className="text-amber-700 dark:text-amber-300">raw_line</span>: str) -&gt; dict:
          </p>
          <p className="pl-4">
            parts = [p.strip() <span className="text-indigo-600 dark:text-indigo-400">for</span> p{" "}
            <span className="text-indigo-600 dark:text-indigo-400">in</span> raw_line.split(<span className="text-emerald-700 dark:text-emerald-300">&quot;,&quot;</span>)]
          </p>
          <p className="pl-4">
            <span className="text-indigo-600 dark:text-indigo-400">if</span>{" "}
            <span className="text-indigo-600 dark:text-indigo-400">len</span>(parts) &lt; 3:
          </p>
          <p className="pl-8 text-rose-600 dark:text-rose-400">
            <span className="text-indigo-600 dark:text-indigo-400">raise</span> ValueError(
            <span className="text-emerald-700 dark:text-emerald-300">&quot;Corrupt entry&quot;</span>)
          </p>
          <p className="pl-4 text-emerald-700 dark:text-emerald-300">
            <span className="text-indigo-600 dark:text-indigo-400">return</span> &#123;
            <span className="text-slate-600 dark:text-slate-300">&quot;id&quot;</span>: parts[0],{" "}
            <span className="text-slate-600 dark:text-slate-300">&quot;amount&quot;</span>: float(parts[2])&#125;
          </p>
        </div>
      </div>

      {/* LAYER 2: Crystalline Execution Bridge / Node (Center floating layer) */}
      <div
        className="absolute top-[32%] right-4 sm:right-10 z-20 flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          transform: "rotate(2deg) translateZ(30px)",
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.65) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 20px 35px -8px rgba(14, 165, 233, 0.25), 0 2px 10px rgba(0, 0, 0, 0.04), inset 0 1px 1px white",
        }}
      >
        <div className="size-8 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/30 animate-pulse">
          <Cpu className="size-4.5" />
        </div>
        <div className="font-mono text-left">
          <div className="text-[10px] uppercase font-bold tracking-wider text-sky-700 dark:text-sky-300 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <span>EXECUTION NODE</span>
          </div>
          <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
            AST &rarr; Bytecode &rarr; State
          </div>
        </div>
      </div>

      {/* LAYER 3: Translucent Terminal Window / Observable Output (Foreground Layer) */}
      <div
        className="absolute bottom-2 sm:bottom-4 right-0 sm:right-4 w-[90%] sm:w-[86%] rounded-2xl p-5 sm:p-6 transition-transform duration-700 ease-out z-30"
        style={{
          transform: "rotate(1.5deg) translateZ(60px)",
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.72) 100%)",
          backdropFilter: "blur(28px) saturate(200%)",
          WebkitBackdropFilter: "blur(28px) saturate(200%)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          boxShadow:
            "0 35px 70px -15px rgba(0, 0, 0, 0.45), 0 10px 25px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="size-3.5 text-sky-400" />
            <span className="font-mono text-[11px] font-medium text-slate-300">
              Terminal — Output Stream
            </span>
          </div>
          <span className="flex items-center gap-1 font-mono text-[10px] tracking-wider text-emerald-400 font-semibold uppercase">
            <Check className="size-3" />
            LIVE RUNTIME
          </span>
        </div>

        {/* Observable Output Stream */}
        <div className="font-mono text-[11px] sm:text-xs leading-relaxed space-y-1.5 text-slate-200">
          <p className="text-slate-400">
            $ python3 -m ledger.main --verify-data
          </p>
          <p className="text-sky-300">
            [+] Ingesting: data/transactions.csv (1,240 records)
          </p>
          <p className="text-emerald-400">
            [✓] Schema validated · Ledger checksum: 0x9f4a8e2
          </p>
          <div className="flex items-center justify-between pt-1 text-slate-300 border-t border-white/5">
            <span>&gt;&gt; Running balance: +$14,290.50</span>
            <span className="inline-block w-2 h-3.5 bg-sky-400 animate-pulse ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
