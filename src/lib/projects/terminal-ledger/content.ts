import fs from "fs";
import path from "path";
import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-csv";
import { DocMetadata, TocItem } from "@/lib/docs/types";
import {
  KnowledgePackData,
  PhaseMilestoneData,
} from "./types";
import {
  getPhaseBySlug,
  getNextPhase,
  getPrevPhase,
  TERMINAL_LEDGER_PHASES,
} from "./structure";

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function unescapeYamlString(raw: string): string {
  let val = raw.trim();
  if (
    (val.startsWith('"') && val.endsWith('"') && val.length >= 2) ||
    (val.startsWith("'") && val.endsWith("'") && val.length >= 2)
  ) {
    val = val.slice(1, -1);
  }
  return val
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\")
    .trim();
}

function parseFrontmatter(rawContent: string): { metadata: DocMetadata; markdown: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return {
      metadata: {
        title: "Milestone Brief",
        section: "01",
        estimated_time: "1–2 hours",
        prerequisites: "",
        outcomes: [],
      },
      markdown: rawContent,
    };
  }

  const yamlBlock = match[1];
  const markdown = match[2];

  const metadata: Partial<DocMetadata> = {
    outcomes: [],
  };

  const lines = yamlBlock.split(/\r?\n/);
  let currentKey = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentKey === "outcomes") {
      const val = unescapeYamlString(trimmed.slice(2));
      metadata.outcomes?.push(val);
      continue;
    }

    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > 0) {
      const key = trimmed.slice(0, colonIndex).trim();
      const val = unescapeYamlString(trimmed.slice(colonIndex + 1));
      currentKey = key;

      if (key === "title") metadata.title = val;
      else if (key === "phase" || key === "section") metadata.section = val;
      else if (key === "estimated_time") metadata.estimated_time = val;
      else if (key === "prerequisites") metadata.prerequisites = val;
    }
  }

  return {
    metadata: {
      title: metadata.title || "Milestone Brief",
      section: metadata.section || "01",
      estimated_time: metadata.estimated_time || "1–2 hours",
      prerequisites: metadata.prerequisites || "",
      outcomes: metadata.outcomes || [],
    },
    markdown,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function createCustomRenderer() {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth, text }) {
    if (depth === 1) {
      // Top H1 is rendered custom in the article header
      return "";
    }
    const headingSlug = slugifyHeading(text);
    const parsedInline = this.parser.parseInline(tokens);

    if (depth === 2) {
      return `
        <h2 id="${headingSlug}" class="doc-h2 group scroll-mt-24">
          <span class="doc-heading-text">${parsedInline}</span>
          <a href="#${headingSlug}" class="doc-anchor" aria-label="Direct link to ${escapeHtml(text)}">#</a>
        </h2>
      `;
    }

    return `
      <h3 id="${headingSlug}" class="doc-h3 group scroll-mt-24">
        <span class="doc-heading-text">${parsedInline}</span>
        <a href="#${headingSlug}" class="doc-anchor" aria-label="Direct link to ${escapeHtml(text)}">#</a>
      </h3>
    `;
  };

  renderer.code = function ({ text, lang }) {
    const language = (lang || "text").toLowerCase();
    let highlighted = "";

    try {
      if (language === "python" || language === "py") {
        highlighted = Prism.highlight(text, Prism.languages.python, "python");
      } else if (language === "bash" || language === "sh" || language === "shell") {
        highlighted = Prism.highlight(text, Prism.languages.bash, "bash");
      } else if (language === "json") {
        highlighted = Prism.highlight(text, Prism.languages.json, "json");
      } else if (language === "csv") {
        highlighted = Prism.highlight(text, Prism.languages.csv || Prism.languages.text, "csv");
      } else {
        highlighted = escapeHtml(text);
      }
    } catch {
      highlighted = escapeHtml(text);
    }

    const rawEscaped = escapeHtml(text);
    const displayLang = language === "bash" || language === "sh" ? "terminal" : language;

    return `
      <div class="doc-code-block not-prose" data-lang="${displayLang}">
        <div class="doc-code-header">
          <span class="doc-code-lang">${displayLang}</span>
          <button
            type="button"
            class="doc-code-copy-btn"
            data-code="${rawEscaped}"
            aria-label="Copy code to clipboard"
          >
            <span class="copy-text">Copy</span>
          </button>
        </div>
        <div class="doc-code-scroll">
          <pre class="language-${language}"><code>${highlighted}</code></pre>
        </div>
      </div>
    `;
  };

  renderer.blockquote = function ({ tokens }) {
    const body = this.parser.parse(tokens);
    return `
      <blockquote class="doc-callout">
        <div class="doc-callout-inner">
          ${body}
        </div>
      </blockquote>
    `;
  };

  renderer.hr = function () {
    return `<hr class="doc-hr" />`;
  };

  renderer.link = function ({ href, title, tokens }) {
    const text = this.parser.parseInline(tokens);
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
    const isExternal = href.startsWith("http://") || href.startsWith("https://");
    const targetAttr = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a href="${href}" class="doc-link"${titleAttr}${targetAttr}>${text}</a>`;
  };

  return renderer;
}

export function loadKnowledgePackContent(packSlugOrFilename: string): KnowledgePackData | null {
  const fileName = packSlugOrFilename.endsWith(".md")
    ? packSlugOrFilename
    : `${packSlugOrFilename}.md`;

  const filePath = path.join(
    process.cwd(),
    "Brain",
    "projects",
    "python",
    "terminal-ledger",
    "knowledge-packs",
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, markdown } = parseFrontmatter(raw);

  // Extract TOC
  const toc: TocItem[] = [];
  const tokens = marked.lexer(markdown);
  tokens.forEach((token) => {
    if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
      const cleanText = token.text.replace(/`([^`]+)`/g, "$1").replace(/<[^>]+>/g, "");
      const id = slugifyHeading(token.text);
      toc.push({ id, text: cleanText, depth: token.depth });
    }
  });

  const renderer = createCustomRenderer();
  const htmlContent = marked.parse(markdown, { renderer, gfm: true }) as string;

  const baseSlug = fileName.replace(/\.md$/, "");
  const packNameMatch = metadata.title.match(/^([^—]+)—/);
  const packName = packNameMatch ? packNameMatch[1].trim() : metadata.title;

  return {
    id: baseSlug,
    title: metadata.title,
    slug: baseSlug,
    packName,
    phaseNumber: parseInt(metadata.section || "0", 10),
    filename: fileName,
    estimatedTime: metadata.estimated_time || "15–20 minutes",
    prerequisites: metadata.prerequisites || "",
    outcomes: metadata.outcomes || [],
    markdown,
    htmlContent,
    toc,
  };
}

export function loadPhaseMilestoneContent(phaseSlug: string): PhaseMilestoneData | null {
  const phase = getPhaseBySlug(phaseSlug);
  if (!phase) return null;

  const filePath = path.join(
    process.cwd(),
    "Brain",
    "projects",
    "python",
    "terminal-ledger",
    phase.briefFileName
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, markdown } = parseFrontmatter(raw);

  // Extract TOC
  const toc: TocItem[] = [];
  const tokens = marked.lexer(markdown);
  tokens.forEach((token) => {
    if (token.type === "heading" && (token.depth === 2 || token.depth === 3)) {
      const cleanText = token.text.replace(/`([^`]+)`/g, "$1").replace(/<[^>]+>/g, "");
      const id = slugifyHeading(token.text);
      toc.push({ id, text: cleanText, depth: token.depth });
    }
  });

  const renderer = createCustomRenderer();
  const htmlContent = marked.parse(markdown, { renderer, gfm: true }) as string;

  const prev = getPrevPhase(phase.slug);
  const next = getNextPhase(phase.slug);

  // Load associated knowledge packs (for Phase 1, this will be empty array [])
  const knowledgePacks: KnowledgePackData[] = [];
  for (const packRef of phase.standalonePacks) {
    const packData = loadKnowledgePackContent(packRef.filename);
    if (packData) {
      knowledgePacks.push(packData);
    }
  }

  return {
    phase,
    metadata,
    markdown,
    htmlContent,
    toc,
    prevPhase: prev
      ? {
          number: prev.number,
          slug: prev.slug,
          title: prev.title,
        }
      : undefined,
    nextPhase: next
      ? {
          number: next.number,
          slug: next.slug,
          title: next.title,
        }
      : undefined,
    knowledgePacks,
  };
}

export function getAllPhaseMilestones(): PhaseMilestoneData[] {
  return TERMINAL_LEDGER_PHASES.map((p) => {
    const data = loadPhaseMilestoneContent(p.slug);
    if (!data) {
      throw new Error(`Failed to load milestone content for phase ${p.slug}`);
    }
    return data;
  });
}
