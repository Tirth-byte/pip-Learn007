"use client";

import { useSyncExternalStore, useCallback, useEffect } from "react";

export type ThemePreference = "light" | "dark" | "system";

const STORAGE_KEY = "piplearn_theme_preference";

let currentPreference: ThemePreference = "system";
let isLoaded = false;
const listeners = new Set<() => void>();

function getSystemIsDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(preference: ThemePreference) {
  if (typeof document === "undefined") return;
  const isDark =
    preference === "dark" || (preference === "system" && getSystemIsDark());
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function loadPreferenceFromStorage(): ThemePreference {
  if (typeof window === "undefined" || !window.localStorage) {
    return "system";
  }
  try {
    const saved =
      window.localStorage.getItem(STORAGE_KEY) ||
      window.localStorage.getItem("piplearn_theme");
    if (saved === "light" || saved === "dark" || saved === "system") {
      return saved as ThemePreference;
    }
  } catch (err) {
    console.error("Failed to read theme preference from storage:", err);
  }
  return "system";
}

function setPreferenceAndPersist(preference: ThemePreference) {
  currentPreference = preference;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
      window.localStorage.setItem("piplearn_theme", preference);
    } catch (err) {
      console.error("Failed to persist theme preference:", err);
    }
  }
  applyTheme(preference);
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): ThemePreference {
  if (!isLoaded && typeof window !== "undefined") {
    isLoaded = true;
    currentPreference = loadPreferenceFromStorage();
    applyTheme(currentPreference);
  }
  return currentPreference;
}

function getServerSnapshot(): ThemePreference {
  return "system";
}

export function useTheme() {
  const preference = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Apply current theme on mount
    applyTheme(currentPreference);

    // Watch for OS prefers-color-scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => {
      if (currentPreference === "system") {
        applyTheme("system");
        listeners.forEach((listener) => listener());
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  const setTheme = useCallback((next: ThemePreference) => {
    setPreferenceAndPersist(next);
  }, []);

  const isDark =
    preference === "dark" ||
    (preference === "system" &&
      (typeof window !== "undefined" ? getSystemIsDark() : false));

  return {
    preference,
    setTheme,
    isDark,
  };
}
