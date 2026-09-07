/**
 * Navigation utilities for PipLearn.
 * Accurately determines internal vs external routes to guarantee same-tab navigation for internal routes.
 */

const KNOWN_INTERNAL_DOMAINS = [
  "piplearn.dev",
  "www.piplearn.dev",
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
];

/**
 * Determines whether a given URL or path is an internal PipLearn destination.
 */
export function isInternalUrl(href: string): boolean {
  if (!href) return true;

  // Relative paths, hash anchors, and query strings are internal
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("?") ||
    href.startsWith("./") ||
    href.startsWith("../")
  ) {
    return true;
  }

  // Non-HTTP protocols like mailto: and tel: are external
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return false;
  }

  // Absolute URLs: check if hostname matches PipLearn domains
  try {
    const parsed = new URL(href, "http://localhost:3000");
    // If original string did not have protocol, it's relative
    if (!href.includes("://")) {
      return true;
    }
    return KNOWN_INTERNAL_DOMAINS.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return !href.includes("://");
  }
}

/**
 * Determines whether a given URL is external to PipLearn.
 */
export function isExternalUrl(href: string): boolean {
  return !isInternalUrl(href);
}
