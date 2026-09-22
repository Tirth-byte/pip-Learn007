import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { STARTING_MANUAL_SECTIONS } from "@/lib/docs/manual-structure";
import { loadSectionContent } from "@/lib/docs/content";
import { DocReaderLayout } from "@/components/docs/doc-reader-layout";
import { AuthShell } from "@/components/shell/auth-shell";

export function generateStaticParams() {
  return STARTING_MANUAL_SECTIONS.map((section) => ({
    slug: section.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chapter = loadSectionContent(slug);

  if (!chapter) {
    return {
      title: "Section Not Found — PipLearn",
    };
  }

  return {
    title: `Section ${chapter.metadata.section} — ${chapter.metadata.title} | PipLearn`,
    description: `Learn ${chapter.metadata.title} in the PipLearn Python Starting Manual.`,
  };
}

export default async function ManualSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = loadSectionContent(slug);

  if (!chapter) {
    notFound();
  }

  return (
    <AuthShell activeItem="learn">
      <DocReaderLayout chapter={chapter} routePrefix="/manual" currentSlug={slug} />
    </AuthShell>
  );
}
