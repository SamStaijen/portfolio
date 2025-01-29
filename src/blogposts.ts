import { writeFileSync } from 'fs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export async function buildPostPages(entries: any[]) {
  for (const entry of entries) {
    await buildPostPage(entry);
  }
}
async function buildPostPage(entry: any) {
  const { title, description } = entry.fields;
  const richTextHtml = documentToHtmlString(description);

  const postHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <link rel="stylesheet" href="styles.css" />
      </head>
      <body>
        <header>
          <h1>${Bun.env['DOMAIN']}</h1>
          <nav>
            <a href="index.html">Home</a>
          </nav>
        </header>
        <main>
          <article>
            <h2>${title}</h2>
            <div class="description">${richTextHtml}</div>
          </article>
        </main>
      </body>
      </html>
    `;

  // Write the individual blog post page to the output directory
  writeFileSync(`dist/post-${entry.sys.id}.html`, postHtml);
  console.log(`Post page built: dist/post-${entry.sys.id}.html`);
}
