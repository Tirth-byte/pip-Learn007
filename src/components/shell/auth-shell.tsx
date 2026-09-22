"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FolderKanban,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useAppContext } from "@/context/app-context";
import "@/styles/authenticated.css";

interface AuthShellProps {
  children: React.ReactNode;
  activeItem?: "home" | "learn" | "projects";
}

function PipLearnNavLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-7" fill="none" aria-label="PipLearn Home">
      {/* Top Layer */}
      <path d="M24 8 L38 16 L24 24 L10 16 Z" fill="currentColor" className="text-foreground" />
      {/* Middle Layer */}
      <path d="M10 21 L24 29 L38 21 L38 24.5 L24 32.5 L10 24.5 Z" fill="#0066FF" />
      {/* Bottom Layer */}
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="currentColor" className="text-foreground/80" />
    </svg>
  );
}

export function AuthShell({ children, activeItem }: AuthShellProps) {
  const pathname = usePathname() || "";
  const { resumeSection } = useManualProgress();
  const { user } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Derive active tab from prop or pathname
  const currentActive =
    activeItem ||
    (pathname.startsWith("/manual") || pathname.startsWith("/learn")
      ? "learn"
      : pathname.startsWith("/projects")
      ? "projects"
      : "home");

  const learnHref = `/manual/${resumeSection.slug}/`;
  const userInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : "L";

  return (
    <div className="piplearn-auth-shell min-h-screen flex flex-col md:flex-row bg-background text-foreground">
      {/* Mobile Top Header */}
      <header className="md:hidden sticky top-0 z-40 h-13 border-b border-border bg-background/95 backdrop-blur-xs flex items-center justify-between px-4">
        <Link href="/home/" className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground">
          <PipLearnNavLogo />
          <span>PipLearn</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle align="bottom" />

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-64 max-w-[80vw] bg-background border-r border-border shadow-2xl p-5 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <PipLearnNavLogo />
                  <span>PipLearn</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-5 space-y-1" aria-label="Mobile Navigation">
                <Link
                  href="/home/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentActive === "home"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>

                <Link
                  href={learnHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentActive === "learn"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Learn</span>
                </Link>

                <Link
                  href="/projects/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    currentActive === "projects"
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <FolderKanban className="h-4 w-4" />
                  <span>Projects</span>
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">
                  {userInitial}
                </div>
                <div className="text-xs truncate max-w-[120px]">
                  <div className="font-medium text-foreground truncate">{user.name || "Learner"}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{user.email || "Workspace"}</div>
                </div>
              </div>

              <ThemeToggle align="top" />
            </div>
          </div>
        </div>
      )}

      {/* Desktop Left Rail */}
      <aside className="auth-nav-rail hidden md:flex" aria-label="Authenticated Navigation Rail">
        {/* Top: Logo */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/home/"
            className="flex items-center justify-center p-1.5 rounded-lg hover:opacity-85 transition-opacity"
            title="PipLearn Home"
          >
            <PipLearnNavLogo />
          </Link>

          {/* Primary Navigation Stack */}
          <nav className="flex flex-col items-center gap-2" aria-label="Main Navigation">
            <Link
              href="/home/"
              className={`auth-nav-item ${currentActive === "home" ? "active" : ""}`}
              aria-label="Home"
              aria-current={currentActive === "home" ? "page" : undefined}
              title="Home"
            >
              <Home className="h-4 w-4" />
              <span className="auth-nav-label">Home</span>
            </Link>

            <Link
              href={learnHref}
              className={`auth-nav-item ${currentActive === "learn" ? "active" : ""}`}
              aria-label="Learn"
              aria-current={currentActive === "learn" ? "page" : undefined}
              title="Learn (Starting Manual)"
            >
              <BookOpen className="h-4 w-4" />
              <span className="auth-nav-label">Learn</span>
            </Link>

            <Link
              href="/projects/"
              className={`auth-nav-item ${currentActive === "projects" ? "active" : ""}`}
              aria-label="Projects"
              aria-current={currentActive === "projects" ? "page" : undefined}
              title="Projects"
            >
              <FolderKanban className="h-4 w-4" />
              <span className="auth-nav-label">Projects</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Utility Area */}
        <div className="flex flex-col items-center gap-3">
          {/* 3-State Theme Selector */}
          <ThemeToggle align="right" />

          {/* Minimal User Affordance */}
          <div
            className="size-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-semibold cursor-default select-none border border-primary/20"
            title={`Signed in as ${user.name || "Learner"}`}
            aria-label={`User profile: ${user.name || "Learner"}`}
          >
            {userInitial}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {children}
      </div>
    </div>
  );
}
