"use client";

import React, { useState } from "react";
import { DocHeader } from "./doc-header";
import { DocSidebar } from "./doc-sidebar";
import { DocToc } from "./doc-toc";
import { DocMetadataBanner } from "./doc-metadata-banner";
import { DocArticleClient } from "./doc-article-client";
import { DocChapterData } from "@/lib/docs/types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DocReaderLayoutProps {
  chapter: DocChapterData;
}

export function DocReaderLayout({ chapter }: DocReaderLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="doc-reader-root min-h-screen flex flex-col bg-background text-foreground selection:bg-primary/20 selection:text-foreground">
      {/* Top Header */}
      <DocHeader
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Container */}
      <div className="flex-1 flex max-w-[1400px] w-full mx-auto justify-between">
        {/* Desktop Left Sidebar: Compact curriculum navigation */}
        <div className="hidden lg:block w-[230px] shrink-0 border-r border-border/70">
          <div className="sticky top-13 h-[calc(100vh-3.25rem)] overflow-y-auto">
            <DocSidebar currentSectionId={chapter.metadata.section} />
          </div>
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
              onClick={() => setIsSidebarOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-background border-r border-border shadow-xl z-10 flex flex-col">
              <DocSidebar
                currentSectionId={chapter.metadata.section}
                onNavigate={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Center: Dominant Reading Surface */}
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 min-w-0 px-5 sm:px-10 md:px-14 lg:px-16 py-7 lg:py-9 max-w-[820px] mx-auto outline-none"
        >
          <article className="prose-container">
            {/* Metadata Header */}
            <DocMetadataBanner metadata={chapter.metadata} />

            {/* Rendered Markdown Prose */}
            <DocArticleClient htmlContent={chapter.htmlContent} />

            {/* Bottom Section Navigation */}
            <nav
              aria-label="Previous and next section navigation"
              className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
            >
              {chapter.prevSection ? (
                <div className="w-full sm:w-auto flex flex-col text-left">
                  <span className="text-xs text-muted-foreground/80 mb-1">Previous</span>
                  <div className="text-muted-foreground/60 cursor-not-allowed flex items-center gap-1.5">
                    <ChevronLeft className="h-4 w-4" />
                    <span>{chapter.prevSection.title}</span>
                  </div>
                </div>
              ) : (
                <div />
              )}

              {chapter.nextSection && (
                <div className="w-full sm:w-auto flex flex-col text-right ml-auto">
                  <span className="text-xs text-muted-foreground/80 mb-1">Next Section</span>
                  <div className="text-muted-foreground flex items-center gap-1.5 justify-end">
                    <span>{chapter.nextSection.title}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] text-muted-foreground/60 uppercase font-mono mt-0.5">
                    Coming Next
                  </span>
                </div>
              )}
            </nav>
          </article>
        </main>

        {/* Desktop Right Rail: Quiet Orientation Aid (Table of Contents) */}
        <div className="hidden xl:block w-[220px] shrink-0 border-l border-border/50">
          <div className="sticky top-13 h-[calc(100vh-3.25rem)] overflow-y-auto py-7 px-4">
            <DocToc items={chapter.toc} />
          </div>
        </div>
      </div>
    </div>
  );
}
