export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9\u0400-\u04FF-]/g, "") // Remove invalid chars (keep cyrillic)
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function deslugify(slug: string): string {
  return slug
    .toString()
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}


