import { createClient } from "contentful";

export const client = createClient({
  space: Bun.env["CONTENTFUL_SPACE_ID"] as string,
  accessToken: Bun.env["CONTENTFUL_ACCESS_TOKEN"] as string,
});

export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
