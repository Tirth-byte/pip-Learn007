"use client";

import React, { useEffect, useState } from "react";
import { TocItem } from "@/lib/docs/types";

interface DocTocProps {
  items: TocItem[];
}

export function DocToc({ items }: DocTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const handleScroll = () => {
      const headingElements = items
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      if (headingElements.length === 0) return;

      const scrollPosition = window.scrollY + 140;

      let currentId = headingElements[0].id;
      for (const el of headingElements) {
        if (el.offsetTop <= scrollPosition) {
          currentId = el.id;
        } else {
          break;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  // Identify which H2 is currently active (either directly or as parent of active H3)
  const currentH2Id = React.useMemo(() => {
    if (!activeId) {
      return items.find((item) => item.depth === 2)?.id || "";
    }

    const activeIndex = items.findIndex((item) => item.id === activeId);
    if (activeIndex === -1) {
      return items.find((item) => item.depth === 2)?.id || "";
    }

    if (items[activeIndex].depth === 2) {
      return items[activeIndex].id;
    }

    for (let i = activeIndex - 1; i >= 0; i--) {
      if (items[i].depth === 2) {
        return items[i].id;
      }
    }

    return items.find((item) => item.depth === 2)?.id || "";
  }, [items, activeId]);

  // Filter to primary H2s plus H3 subheadings of ONLY the currently active H2 section
  const visibleItems = React.useMemo(() => {
    let parentH2Id = "";
    const result: TocItem[] = [];

    for (const item of items) {
      if (item.depth === 2) {
        parentH2Id = item.id;
        result.push(item);
      } else if (item.depth === 3 && parentH2Id === currentH2Id) {
        result.push(item);
      }
    }

    return result;
  }, [items, currentH2Id]);

  if (items.length === 0) return null;

  return (
    <aside aria-label="Table of contents" className="w-full text-xs select-none">
      <div className="font-mono text-[10.5px] font-semibold tracking-[0.14em] uppercase text-muted-foreground/80 mb-3">
        On this page
      </div>
      <nav className="space-y-1 max-h-[calc(100vh-10rem)] overflow-y-auto pr-1 border-l border-foreground/10">
        {visibleItems.map((item) => {
          const isDirectlyActive = activeId === item.id;
          const isParentActive = item.depth === 2 && currentH2Id === item.id;
          const isSubheading = item.depth === 3;

          let itemClasses = "";
          if (isDirectlyActive) {
            itemClasses = "text-foreground font-medium border-l-2 border-foreground -ml-[1px] pl-2.5";
          } else if (isParentActive && !isSubheading) {
            itemClasses = "text-foreground/80 font-normal border-l-2 border-foreground/30 -ml-[1px] pl-2.5";
          } else {
            itemClasses = "text-muted-foreground hover:text-foreground pl-3";
          }

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  target.scrollIntoView({ behavior: "smooth" });
                  window.history.pushState(null, "", `#${item.id}`);
                }
              }}
              className={`block leading-snug py-1 transition-colors ${
                isSubheading ? "text-[11.5px]" : "text-[12.5px]"
              } ${itemClasses}`}
            >
              <span className="line-clamp-2">{item.text}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
