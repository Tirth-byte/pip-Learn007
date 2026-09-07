"use client";

import React, { useEffect, useRef } from "react";

interface DocArticleClientProps {
  htmlContent: string;
}

export function DocArticleClient({ htmlContent }: DocArticleClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle code copy buttons
    const handleCopyClick = async (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".doc-code-copy-btn");
      if (!target) return;

      const code = target.getAttribute("data-code");
      if (!code) return;

      try {
        await navigator.clipboard.writeText(decodeURIComponent(code));
        const copyTextSpan = target.querySelector(".copy-text");
        if (copyTextSpan) {
          copyTextSpan.textContent = "Copied!";
        }
        target.classList.add("copied");

        setTimeout(() => {
          if (copyTextSpan) {
            copyTextSpan.textContent = "Copy";
          }
          target.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    };

    container.addEventListener("click", handleCopyClick);

    return () => {
      container.removeEventListener("click", handleCopyClick);
    };
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      className="doc-article"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
