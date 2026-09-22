"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/shell/theme-toggle";

interface DocHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function DocHeader({ onToggleSidebar, isSidebarOpen }: DocHeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur-xs">
      <div className="flex h-13 items-center justify-between px-4 sm:px-6">
        {/* Left: Breadcrumbs / Title */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
              aria-label={isSidebarOpen ? "Close navigation" : "Open navigation"}
            >
              {isSidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          )}

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm">
            <Link
              href="/home/"
              className="font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
            >
              PipLearn
            </Link>
            <span className="text-muted-foreground/60 select-none">/</span>
            <span className="font-medium text-foreground">Python</span>
            <span className="text-muted-foreground/60 select-none">/</span>
            <span className="text-muted-foreground">Starting Manual</span>
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle align="bottom" />
        </div>
      </div>
    </header>
  );
}
