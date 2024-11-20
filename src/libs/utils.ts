export function createSlug(title: string) {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}
