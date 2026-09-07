"use client";

import React, { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/app-context";

function subscribe() {
  return () => {};
}

export default function AppPage() {
  const { isAuthenticated, logout } = useAppContext();
  const router = useRouter();
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#111] text-neutral-900 dark:text-neutral-100 flex flex-col items-center justify-center p-6 select-none">
      <div className="max-w-sm w-full space-y-6 text-center">
        <div className="space-y-2">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            pip learn
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            You&apos;re signed in.
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            The new learning experience is being built.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
