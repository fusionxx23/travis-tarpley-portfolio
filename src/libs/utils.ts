export function createSlug(title: string) {
  return title
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphen
    .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
}

export async function deployVercel() {
  const resp = await fetch(
    import.meta.env.VERCEL_DEPLOY_HOOK,
    {
      method: "POST",
    },
  ).then((r) => r.json());
  return resp;
}
