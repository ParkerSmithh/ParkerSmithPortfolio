/**
 * Resolves a path under /public against the site's base URL, so "/images/x.webp"
 * works both at a domain root and under a GitHub Pages project path.
 * Full URLs (https://…) pass through unchanged.
 */
export function asset(path: string): string;
export function asset(path: string | undefined): string | undefined;
export function asset(path: string | undefined) {
  if (!path || /^[a-z]+:/i.test(path)) return path;
  return import.meta.env.BASE_URL + path.replace(/^\//, "");
}
