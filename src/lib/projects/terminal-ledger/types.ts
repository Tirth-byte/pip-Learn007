import { DocMetadata, TocItem } from "@/lib/docs/types";

export interface StandalonePackRef {
  id: string; // e.g. "records-01"
  title: string; // e.g. "Records 01 — Modeling One Thing with Several Fields"
  shortTitle: string; // e.g. "Records 01"
  slug: string; // e.g. "records-01-modeling-one-thing-with-several-fields"
  filename: string; // e.g. "records-01-modeling-one-thing-with-several-fields.md"
  estimatedTime?: string;
  prerequisites?: string;
}

export interface TerminalLedgerPhase {
  id: string; // "phase-01"
  number: number; // 1
  slug: string; // "phase-01"
  title: string; // "Plan the Finance System"
  fullTitle: string; // "Phase 1: Plan the Finance System"
  estimatedTime: string; // "1–1.5 hours"
  prerequisites: string; // "Starting Manual complete"
  briefFileName: string; // "phase-01-milestone-brief.md"
  standalonePacks: StandalonePackRef[];
  isCheckpointFollowed: boolean;
  checkpointNumber?: 1 | 2 | 3;
  criteria: string[];
  summary: string;
}

export interface KnowledgePackData {
  id: string;
  title: string;
  slug: string;
  packName: string;
  phaseNumber: number;
  filename: string;
  estimatedTime: string;
  prerequisites: string;
  outcomes: string[];
  markdown: string;
  htmlContent: string;
  toc: TocItem[];
}

export interface PhaseMilestoneData {
  phase: TerminalLedgerPhase;
  metadata: DocMetadata;
  markdown: string;
  htmlContent: string;
  toc: TocItem[];
  prevPhase?: {
    number: number;
    slug: string;
    title: string;
  };
  nextPhase?: {
    number: number;
    slug: string;
    title: string;
  };
  knowledgePacks: KnowledgePackData[];
}
