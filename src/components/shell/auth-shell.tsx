"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  BookOpen,
  FolderKanban,
  NotebookPen,
  Users,
  Menu,
  X,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useManualProgress } from "@/learning-state/manual-progress";
import { useAppContext } from "@/context/app-context";
import "@/styles/authenticated.css";

export type AuthEnvironment =
  | "home"
  | "manual"
  | "projects"
  | "build"
  | "journal"
  | "mentors"
  | "checkpoint";

interface AuthShellProps {
  children: React.ReactNode;
  activeItem?: "home" | "learn" | "projects" | "journal" | "mentors";
  environment?: AuthEnvironment;
}

function PipLearnNavLogo() {
  return (
    <svg viewBox="0 0 48 48" className="size-6 text-foreground" fill="none" aria-label="PipLearn Home">
      {/* PipLearn 3-Tier Layered Diamond Logo */}
      {/* Top Layer */}
      <path d="M24 7 L38 15 L24 23 L10 15 Z" fill="currentColor" className="text-primary" />
      {/* Middle Layer */}
      <path d="M10 22 L24 30 L38 22 L38 25.5 L24 33.5 L10 25.5 Z" fill="currentColor" className="text-primary/75" />
      {/* Bottom Layer */}
      <path d="M10 29.5 L24 37.5 L38 29.5 L38 33 L24 41 L10 33 Z" fill="currentColor" className="text-foreground/80" />
    </svg>
  );
}

export function AuthShell({ children, activeItem, environment }: AuthShellProps) {
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
      : pathname.startsWith("/journal")
      ? "journal"
      : pathname.startsWith("/mentors")
      ? "mentors"
      : "home");

  // Derive environmental mood from prop or pathname
  const resolvedEnv: AuthEnvironment =
    environment ||
    (pathname.startsWith("/manual") || pathname.startsWith("/learn")
      ? "manual"
      : pathname.includes("/phases/")
      ? "build"
      : pathname.includes("/review") || pathname.includes("/checkpoints/")
      ? "checkpoint"
      : pathname.startsWith("/projects")
      ? "projects"
      : pathname.startsWith("/journal")
      ? "journal"
      : pathname.startsWith("/mentors")
      ? "mentors"
      : "home");

  const learnHref = `/manual/${resumeSection.slug}/`;
  const userInitial = user.firstName ? user.firstName.charAt(0).toUpperCase() : "L";

  return (
    <div className={`piplearn-auth-shell auth-env-${resolvedEnv} min-h-screen flex flex-col text-foreground`}>
      {/* Floating Top Minimal Navigation Header */}
      <header className="auth-floating-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          {/* Left: PipLearn Brand Identity linking to Home */}
          <div className="flex items-center gap-8">
            <Link
              href="/home/"
              className="flex items-center gap-2.5 group py-1.5 focus-visible:outline-2 focus-visible:outline-primary rounded-md"
              title="PipLearn Home"
            >
              <PipLearnNavLogo />
              <span className="font-semibold text-[15px] tracking-tight text-foreground transition-opacity group-hover:opacity-80">
                PipLearn
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              <Link
                href={learnHref}
                className={`auth-nav-link ${currentActive === "learn" ? "active" : ""}`}
                aria-current={currentActive === "learn" ? "page" : undefined}
                title="Starting Manual"
              >
                Learn
              </Link>

              <Link
                href="/projects/"
                className={`auth-nav-link ${currentActive === "projects" ? "active" : ""}`}
                aria-current={currentActive === "projects" ? "page" : undefined}
                title="Projects"
              >
                Projects
              </Link>

              <Link
                href="/journal/"
                className={`auth-nav-link ${currentActive === "journal" ? "active" : ""}`}
                aria-current={currentActive === "journal" ? "page" : undefined}
                title="Problem Journal"
              >
                Journal
              </Link>

              <Link
                href="/mentors/"
                className={`auth-nav-link ${currentActive === "mentors" ? "active" : ""}`}
                aria-current={currentActive === "mentors" ? "page" : undefined}
                title="Mentors & Checkpoints"
              >
                Mentors
              </Link>
            </nav>
          </div>

          {/* Right: Controls & Learner Avatar */}
          <div className="flex items-center gap-3">
            <ThemeToggle align="bottom" />

            <div
              className="hidden sm:flex size-8 rounded-full bg-foreground/10 text-foreground items-center justify-center text-xs font-semibold select-none border border-foreground/15"
              title={`Signed in as ${user.name || "Learner"}`}
              aria-label={`User profile: ${user.name || "Learner"}`}
            >
              {userInitial}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-background/95 backdrop-blur-2xl border-r border-border/80 shadow-2xl p-6 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <Link
                  href="/home/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 text-sm font-semibold text-foreground"
                >
                  <PipLearnNavLogo />
                  <span>PipLearn</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <nav className="mt-6 space-y-1.5" aria-label="Mobile Navigation">
                <Link
                  href="/home/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentActive === "home"
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>

                <Link
                  href={learnHref}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentActive === "learn"
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Learn</span>
                </Link>

                <Link
                  href="/projects/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentActive === "projects"
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <FolderKanban className="h-4 w-4" />
                  <span>Projects</span>
                </Link>

                <Link
                  href="/journal/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentActive === "journal"
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <NotebookPen className="h-4 w-4" />
                  <span>Journal</span>
                </Link>

                <Link
                  href="/mentors/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    currentActive === "mentors"
                      ? "bg-foreground/10 text-foreground font-semibold"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Mentors</span>
                </Link>
              </nav>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-full bg-foreground/10 text-foreground flex items-center justify-center text-xs font-semibold">
                  {userInitial}
                </div>
                <div className="text-xs truncate max-w-[130px]">
                  <div className="font-medium text-foreground truncate">{user.name || "Learner"}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{user.email || "Workspace"}</div>
                </div>
              </div>

              <ThemeToggle align="top" />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area: Takes Full Width and Breathes in Environment */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
}
