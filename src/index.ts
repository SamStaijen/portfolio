import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { fetchEntries } from './contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// Ensure the 'dist' directory exists
if (!existsSync('dist')) {
  mkdirSync('dist');
}

// Fetch data from Contentful
async function buildSite() {
  const entries = await fetchEntries('exampleContentModel');

  // Generate simple HTML with Rich Text parsed to HTML
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Static Site</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .entry { margin-bottom: 20px; }
        .entry h2 { color: #333; }
      </style>
    </head>
    <body>
      <h1>My Static Site</h1>
      ${entries
        .map((entry: any) => {
          const { title, description } = entry.fields;
          // Convert the rich text description to HTML
          const richTextHtml = documentToHtmlString(description);

          return `
            <div class="entry">
              <h2>${title}</h2>
              <div class="description">${richTextHtml}</div>
            </div>
          `;
        })
        .join('')}
    </body>
    </html>
  `;

  // Write HTML to the output directory
  writeFileSync('dist/index.html', html);
  console.log('Static site built: dist/index.html');
}

buildSite().catch(console.error);
