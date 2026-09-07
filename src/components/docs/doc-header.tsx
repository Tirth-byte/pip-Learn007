"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

interface DocHeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function DocHeader({ onToggleSidebar, isSidebarOpen }: DocHeaderProps) {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    () => document.documentElement.classList.contains("dark"),
    () => false
  );

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains("dark");
    if (isCurrentlyDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("piplearn_theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("piplearn_theme", "dark");
    }
  };

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
              href="/"
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
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            title={isDark ? "Light theme" : "Dark theme"}
          >
            {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
