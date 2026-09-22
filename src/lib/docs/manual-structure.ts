import { ManualSectionItem } from "./types";
export type { ManualSectionItem };

export const STARTING_MANUAL_SECTIONS: ManualSectionItem[] = [
  {
    id: "01",
    slug: "01-what-programming-actually-is",
    title: "What Programming Actually Is",
    status: "available",
    time: "8–10 min",
    summary: "Deconstruct vague intentions into repeatable, step-by-step instructions.",
  },
  {
    id: "02",
    slug: "02-running-your-first-python-program",
    title: "Running Your First Python Program",
    status: "available",
    time: "15–20 min",
    summary: "Set up the write → save → run loop in your local terminal and read your first traceback.",
  },
  {
    id: "03",
    slug: "03-values-variables-types",
    title: "Values, Variables & Types",
    status: "available",
    time: "15–20 min",
    summary: "Understand data types, variable assignment, and explicit type conversion.",
  },
  {
    id: "04",
    slug: "04-input-output",
    title: "Input & Output",
    status: "available",
    time: "15–20 min",
    summary: "Accept user input from the terminal, convert types, and format output with f-strings.",
  },
  {
    id: "05",
    slug: "05-making-decisions",
    title: "Making Decisions",
    status: "available",
    time: "20–25 min",
    summary: "Branch execution with if, elif, and else using boolean conditions and comparison operators.",
  },
  {
    id: "06",
    slug: "06-working-with-collections",
    title: "Working With Collections",
    status: "available",
    time: "20–25 min",
    summary: "Organize related data using lists and dictionaries, and understand index boundaries.",
  },
  {
    id: "07",
    slug: "07-repeating-work",
    title: "Repeating Work",
    status: "available",
    time: "20–25 min",
    summary: "Iterate across collections with for loops and manage conditions with while loops.",
  },
  {
    id: "08",
    slug: "08-functions",
    title: "Functions",
    status: "available",
    time: "20–25 min",
    summary: "Package reusable logic with parameters, return values, and local scope boundaries.",
  },
  {
    id: "09",
    slug: "09-errors-debugging",
    title: "Errors & Debugging",
    status: "available",
    time: "25–30 min",
    summary: "Read tracebacks bottom-up, apply the 7-Step Diagnostic Protocol, and handle expected errors.",
  },
  {
    id: "10",
    slug: "10-modules-packages-documentation",
    title: "Modules, Packages & Reading Documentation",
    status: "available",
    time: "25–30 min",
    summary: "Leverage Python standard library modules, read function signatures, and experiment safely.",
  },
  {
    id: "11",
    slug: "11-how-to-start-building-software",
    title: "How to Start Building Software",
    status: "available",
    time: "25–30 min",
    summary: "The transition to real projects: 5 planning questions, 10-step escalation, and Problem Journal.",
  },
];

export function getSectionBySlug(slug: string): ManualSectionItem | undefined {
  return STARTING_MANUAL_SECTIONS.find((s) => s.slug === slug);
}

export function getSectionById(id: string): ManualSectionItem | undefined {
  return STARTING_MANUAL_SECTIONS.find((s) => s.id === id);
}

export function getNextSection(slug: string): ManualSectionItem | undefined {
  const index = STARTING_MANUAL_SECTIONS.findIndex((s) => s.slug === slug);
  if (index >= 0 && index < STARTING_MANUAL_SECTIONS.length - 1) {
    return STARTING_MANUAL_SECTIONS[index + 1];
  }
  return undefined;
}

export function getPrevSection(slug: string): ManualSectionItem | undefined {
  const index = STARTING_MANUAL_SECTIONS.findIndex((s) => s.slug === slug);
  if (index > 0) {
    return STARTING_MANUAL_SECTIONS[index - 1];
  }
  return undefined;
}
