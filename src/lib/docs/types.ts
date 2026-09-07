export interface DocMetadata {
  title: string;
  section: string;
  estimated_time: string;
  prerequisites: string;
  outcomes: string[];
}

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export interface ManualSectionItem {
  id: string;
  slug: string;
  title: string;
  status: "available" | "planned";
  time?: string;
}

export interface DocChapterData {
  metadata: DocMetadata;
  htmlContent: string;
  toc: TocItem[];
  prevSection?: { title: string; slug: string };
  nextSection?: { title: string; slug: string };
}
