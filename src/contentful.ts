import { createClient } from 'contentful';

export const client = createClient({
  space: Bun.env['CONTENTFUL_SPACE_ID'] as string,
  accessToken: Bun.env['CONTENTFUL_ACCESS_TOKEN'] as string,
});

//TODO: migrate from several fetches to 1 fetch, and filter methods that extract the wanted data types.
export async function fetchEntries(contentType: string) {
  console.log(JSON.stringify(contentType));
  const entries = await client.getEntries({ content_type: contentType.trim() });
  return entries.items;
}
