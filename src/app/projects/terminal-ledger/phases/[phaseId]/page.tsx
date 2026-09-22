import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthShell } from "@/components/shell/auth-shell";
import { PhaseWorkspace } from "@/components/projects/phase-workspace";
import { TERMINAL_LEDGER_PHASES, getPhaseBySlug } from "@/lib/projects/terminal-ledger/structure";
import { loadPhaseMilestoneContent } from "@/lib/projects/terminal-ledger/content";

export function generateStaticParams() {
  return TERMINAL_LEDGER_PHASES.map((phase) => ({
    phaseId: phase.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phaseId: string }>;
}): Promise<Metadata> {
  const { phaseId } = await params;
  const phase = getPhaseBySlug(phaseId);

  if (!phase) {
    return {
      title: "Phase Not Found — PipLearn",
    };
  }

  return {
    title: `Phase ${phase.number}: ${phase.title} — Terminal Ledger | PipLearn`,
    description: `Milestone brief and behavioral specifications for Phase ${phase.number} (${phase.title}) of Terminal Ledger.`,
  };
}

export default async function PhaseWorkspacePage({
  params,
}: {
  params: Promise<{ phaseId: string }>;
}) {
  const { phaseId } = await params;
  const milestoneData = loadPhaseMilestoneContent(phaseId);

  if (!milestoneData) {
    notFound();
  }

  return (
    <AuthShell activeItem="projects">
      <PhaseWorkspace milestoneData={milestoneData} />
    </AuthShell>
  );
}
