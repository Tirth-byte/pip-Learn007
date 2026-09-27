"use client";

import React from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";

interface DocHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function DocHeader({ onToggleSidebar, isSidebarOpen }: DocHeaderProps) {
  return (
    <div className="sticky top-15 z-30 w-full border-b border-foreground/8 bg-background/80 backdrop-blur-xl transition-colors">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Left: Mobile Drawer Trigger + Breadcrumb */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium text-foreground bg-foreground/5 hover:bg-foreground/10 transition-colors lg:hidden"
              aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
            >
              {isSidebarOpen ? <X className="size-3.5" /> : <Menu className="size-3.5" />}
              <span>Sections</span>
            </button>
          )}

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link
              href="/home/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <span className="text-foreground/20 select-none">/</span>
            <span className="text-foreground font-medium flex items-center gap-1.5">
              <BookOpen className="size-3.5 text-muted-foreground" />
              <span>Starting Manual</span>
            </span>
          </nav>
        </div>

        {/* Right: Quick link to Projects */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <Link
            href="/projects/"
            className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline-flex items-center gap-1"
          >
            <span>Terminal Ledger</span>
            <span className="text-foreground/40">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
