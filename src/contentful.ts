import { createClient } from "contentful";

export const client = createClient({
  space: Bun.env["SPACE_ID"] as string,
  accessToken: Bun.env["ACCESS_TOKEN"] as string,
});

export async function fetchEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}
