"use client";

import React from "react";
import Link, { type LinkProps } from "next/link";
import { isInternalUrl } from "@/lib/navigation";

export interface AppLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
  external?: boolean;
}

/**
 * AppLink provides unified, reliable link handling across PipLearn:
 * - Internal links stay in the SAME tab using Next.js client-side routing `<Link>` (preserving GitHub Pages basePath).
 * - External links open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.
 * - Preserves standard browser accessibility (Cmd/Ctrl + click, middle-click, context menu).
 */
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
  ({ href, external, target, rel, children, className, ...props }, ref) => {
    const isInternal = external === undefined ? isInternalUrl(href) : !external;

    if (isInternal) {
      return (
        <Link
          ref={ref}
          href={href}
          target={target}
          rel={rel}
          className={className}
          {...props}
        >
          {children}
        </Link>
      );
    }

    return (
      <a
        ref={ref}
        href={href}
        target={target || "_blank"}
        rel={rel || "noopener noreferrer"}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  }
);

AppLink.displayName = "AppLink";
