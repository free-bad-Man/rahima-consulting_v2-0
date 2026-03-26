export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || "https://rahima-consulting.ru").replace(/\/+$/, "");

export const SITE_NAME = "Rahima Consulting";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.png`;

export const siteUrl = new URL(SITE_URL);

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}