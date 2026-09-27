"use client";

import React from "react";
import Link from "next/link";
import { AuthShell } from "@/components/shell/auth-shell";
import {
  LOCKED_MENTORS,
  CHECKPOINT_CURRICULUM_INFO,
  useMentorCheckpoints,
} from "@/learning-state/mentor-checkpoints";
import { useTerminalLedgerProgress } from "@/learning-state/terminal-ledger-progress";
import { ArrowRight } from "lucide-react";
import "./mentors-hero.css";

const getMentorAvatar = (name: string) => {
  const n = name.toLowerCase();
  if (n === "tirth") return "/images/mentors/tirth-avatar.png";
  if (n === "darsh") return "/images/mentors/darsh-avatar.png";
  if (n === "raj") return "/images/mentors/raj-avatar.jpg";
  return null;
};

const CrystalIcon = ({ name }: { name: string }) => {
  const avatar = getMentorAvatar(name);
  
  return (
    <div className="mentor-crystal-wrapper">
      <svg className="mentor-crystal-svg" viewBox="0 0 58 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29 2 L56 17 L56 49 L29 64 L2 49 L2 17 Z" 
              fill="url(#crystalGrad)" 
              stroke="url(#crystalBorder)" strokeWidth="1.5" />
        <path d="M29 2 L29 64 M2 17 L29 33 L56 17 M2 49 L29 33 L56 49" 
              stroke="url(#crystalFacets)" strokeWidth="0.75" />
        <defs>
          <linearGradient id="crystalGrad" x1="0" y1="0" x2="58" y2="66">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.05)" className="crystal-highlight" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.15)" className="crystal-refraction" />
          </linearGradient>
          <linearGradient id="crystalBorder" x1="0" y1="0" x2="58" y2="66">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 1)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" className="crystal-refraction" />
          </linearGradient>
          <linearGradient id="crystalFacets" x1="0" y1="0" x2="58" y2="66">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.05)" />
          </linearGradient>
        </defs>
      </svg>
      
      {avatar ? (
        <div className="mentor-crystal-avatar-container">
          <img src={avatar} alt={name} className="mentor-crystal-avatar-img" />
        </div>
      ) : (
        <div className="mentor-crystal-letter">{name.charAt(0)}</div>
      )}
    </div>
  );
};

export default function MentorsPage() {
  const { records } = useMentorCheckpoints();
  const { activeBlocker, isCheckpointDue, isCheckpointCleared } = useTerminalLedgerProgress();

  return (
    <AuthShell activeItem="mentors" environment="mentors">
      <main className="mentors-cinematic-page flex-1 overflow-y-auto">
        {/* ================================================================ */}
        {/* PART 1 — FULLSCREEN CINEMATIC HERO                               */}
        {/* ================================================================ */}
        <section className="mentors-cinematic-hero" aria-labelledby="mentors-hero-title">
          <img
            src="/images/mentors/mentors-hero-final.png"
            alt=""
            className="mentors-cinematic-hero-art"
          />

          <div className="mentors-cinematic-content">
            <span className="mentors-cinematic-eyebrow">Mentors</span>
            <h1 id="mentors-hero-title" className="mentors-cinematic-title">
              Mentors &<br />Checkpoints
            </h1>
            <p className="mentors-cinematic-description">
              Software engineering cannot be verified solely by automated test suites. At three critical milestones, you present your code, explain data flows, and defend architectural decisions in a 1-on-1 calibration with a human mentor.
            </p>
          </div>
        </section>

        {/* ================================================================ */}
        {/* PART 2 — CALM WHITE WORKSPACE                                    */}
        {/* ================================================================ */}
        <section className="mentors-workspace-section" aria-label="Mentors Workspace">
          <div className="mentors-workspace-container">
            
            {/* Section Introduction */}
            <div className="mentors-section-intro">
              <span className="mentors-intro-eyebrow">Human Calibration</span>
              <h2 className="mentors-intro-title">Three Calibration Milestones</h2>
              <p className="mentors-intro-body">
                Each checkpoint corresponds to a structural shift in the Terminal Ledger codebase.
              </p>
            </div>

            {/* Active Blocker Alert Banner if Checkpoint is Due */}
            {activeBlocker?.type === "CHECKPOINT_REQUIRED" && (
              <div className="p-8 rounded-2xl border border-amber-500/30 bg-amber-500/[0.04] mb-12 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        Checkpoint {activeBlocker.checkpointNumber} Due · Progression Paused
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">
                      Phase {activeBlocker.phaseNumber} Defense Required
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                      Phase {activeBlocker.phaseNumber} code is verified. Prepare your Problem Journal evidence and schedule your review to unlock Phase {activeBlocker.phaseNumber + 1}.
                    </p>
                  </div>

                  <Link
                    href={`/mentors/checkpoints/tl-cp-${activeBlocker.checkpointNumber}/`}
                    className="mentors-btn-black shrink-0"
                  >
                    <span>Prepare Checkpoint {activeBlocker.checkpointNumber}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Checkpoint Timeline */}
            <div className="mentors-timeline">
              {[1, 2, 3].map((cpNum) => {
                const info = CHECKPOINT_CURRICULUM_INFO[cpNum as 1 | 2 | 3];
                const record = records[cpNum as 1 | 2 | 3];
                const cleared = isCheckpointCleared(cpNum as 1 | 2 | 3);
                const due = isCheckpointDue(cpNum as 1 | 2 | 3);

                return (
                  <div key={cpNum} className="mentors-timeline-row">
                    {/* Left Indicator */}
                    <div className="mentors-timeline-indicator">
                      <div className="mentors-crystal-marker">0{cpNum}</div>
                    </div>

                    {/* Middle Content */}
                    <div className="mentors-timeline-content">
                      <div className="mentors-cp-meta">
                        <span className="mentors-cp-label">
                          Checkpoint 0{cpNum}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="mentors-cp-label">
                          After Phase {info.afterPhase}
                        </span>
                        
                        {due && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-600 ml-2">
                            <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span>Due</span>
                          </span>
                        )}
                        {cleared && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 ml-2">
                            <span className="size-1.5 rounded-full bg-emerald-500" />
                            <span>Cleared ({record?.mentor || "Mentor"})</span>
                          </span>
                        )}
                      </div>

                      <h3 className="mentors-cp-title">
                        {info.title}
                      </h3>

                      <p className="mentors-cp-desc">
                        {info.focus}
                      </p>
                    </div>

                    {/* Right Action */}
                    <div className="mentors-timeline-action">
                      <Link
                        href={`/mentors/checkpoints/tl-cp-${cpNum}/`}
                        className={due ? "mentors-btn-black" : "mentors-btn-outline"}
                      >
                        <span>{cleared ? "View Record" : "Prepare Checkpoint"}</span>
                        <ArrowRight className="size-4 btn-arrow" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mentors Roster */}
            <div className="mentors-roster-intro">
              <span className="mentors-intro-eyebrow">PipLearn Mentors</span>
              <h2 className="mentors-intro-title" style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}>
                Human calibration,<br />not automated grading.
              </h2>
              <p className="mentors-intro-body">
                Mentor checkpoints are conversational reviews of your work. You are not expected to have perfect code, but you must be able to articulate why it behaves the way it does.
              </p>
            </div>

            <div className="mentors-roster-grid">
              {LOCKED_MENTORS.map((name) => (
                <div key={name} className="mentor-profile">
                  <CrystalIcon name={name} />
                  <h3 className="mentor-name">
                    {name}
                  </h3>
                  <p className="mentor-role">
                    PipLearn Mentor
                  </p>

                  <div className="mentor-availability">
                    Available for CP-1 · CP-2 · CP-3 reviews
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>
    </AuthShell>
  );
}
