"use client";

import React, { useState, useRef, useEffect } from "react";
import { Sun, Moon, Monitor, Check } from "lucide-react";
import { useTheme, ThemePreference } from "@/hooks/use-theme";

interface ThemeToggleProps {
  align?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function ThemeToggle({ align = "bottom", className = "" }: ThemeToggleProps) {
  const { preference, setTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const options: Array<{ value: ThemePreference; label: string; icon: React.ReactNode }> = [
    { value: "light", label: "Light", icon: <Sun className="size-3.5" /> },
    { value: "dark", label: "Dark", icon: <Moon className="size-3.5" /> },
    { value: "system", label: "System", icon: <Monitor className="size-3.5" /> },
  ];

  const currentIcon =
    preference === "system" ? (
      <Monitor className="size-4" />
    ) : preference === "dark" || isDark ? (
      <Moon className="size-4" />
    ) : (
      <Sun className="size-4" />
    );

  // Popover alignment classes
  const popoverPositionClass =
    align === "top"
      ? "bottom-full mb-2 left-0"
      : align === "left"
      ? "right-full mr-2 top-0"
      : align === "right"
      ? "left-full ml-2 bottom-0"
      : "top-full mt-2 right-0";

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="size-8 rounded-md flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors border border-border/70"
        aria-label={`Theme: currently ${preference}. Click to select Light, Dark, or System.`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        title={`Theme: ${preference}`}
      >
        {currentIcon}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="Select color theme"
          className={`absolute z-50 w-36 rounded-lg border border-border bg-popover p-1 shadow-md text-popover-foreground text-xs select-none ${popoverPositionClass}`}
        >
          {options.map((option) => {
            const isSelected = preference === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors ${
                  isSelected
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className={isSelected ? "text-primary" : "text-muted-foreground"}>
                    {option.icon}
                  </span>
                  <span>{option.label}</span>
                </span>
                {isSelected && <Check className="size-3 text-primary shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
