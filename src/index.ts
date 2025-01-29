import { writeFileSync } from 'fs';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

// Generate the main index.html with a navbar and links to individual blog posts
export async function buildMainPage(entries: any[]) {
  const navbarLinks = entries
    .map(
      (entry: any) => `
        <option value="post-${entry.sys.id}.html">${entry.fields.title}</option>
      `,
    )
    .join('');
  const css = `
/* src/styles.css */

/* Mobile-first styles */
body {
    font-family: 'Arial', sans-serif;
    padding: 20px;
    margin: 0;
    background-color: #f5f5f5;
    color: #333;
}

h1 {
    font-size: 2.5rem;
    text-align: center;
    color: #007BFF;
    margin-bottom: 20px;
}

header {
    margin-bottom: 30px;
}

nav {
    text-align: center;
    margin-top: 10px;
}

select {
    padding: 10px;
    font-size: 1rem;
    border: 2px solid #007BFF;
    border-radius: 5px;
    background-color: #fff;
    color: #333;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

select:hover {
    background-color: #f0f0f0;
}

.entry {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.entry:hover {
    transform: translateY(-5px);
}

.entry h2 {
    font-size: 1.75rem;
    color: #007BFF;
    margin-bottom: 10px;
}

.description {
    font-size: 1.1rem;
    color: #555;
}

.entry a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
}

.entry a:hover {
    color: #0056b3;
}

/* Tablet and up */
@media (min-width: 600px) {
    .entry {
        padding: 25px;
    }

    .entry h2 {
        font-size: 2rem;
    }

    .description {
        font-size: 1.2rem;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    body {
        max-width: 1200px;
        margin: 0 auto;
    }

    .entry {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 30px;
    }

    .description {
        font-size: 1.3rem;
    }
}

/* Post page styles */
article {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

article h2 {
    font-size: 2.5rem;
    color: #007BFF;
    margin-bottom: 20px;
}

article .description {
    font-size: 1.2rem;
    line-height: 1.8;
    color: #555;
}

a {
    color: #007BFF;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s ease;
}
a:hover {
    color: #0056b3;
}

  `;
  // Generate simple HTML with Rich Text parsed to HTML
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${Bun.env['DOMAIN']}</title>
      <link rel="stylesheet" href="styles.css" />
    </head>
    <body>
      <header>
        <h1>${Bun.env['DOMAIN']}</h1>
        <nav>
          <select onchange="window.location.href=this.value;">
            <option value="#">Select a Blog Post</option>
            ${navbarLinks}
          </select>
        </nav>
      </header>
      <main>
        ${entries
          .map((entry: any) => {
            const { title, description } = entry.fields;
            const postLink = `post-${entry.sys.id}.html`; // link to the individual post page
            // Convert the rich text description to HTML
            const richTextHtml = documentToHtmlString(description);

            return `
              <div class="entry">
                <h2><a href="${postLink}">${title}</a></h2>
                <div class="description">${richTextHtml}</div>
              </div>
            `;
          })
          .join('')}
      </main>
    </body>
    </html>
  `;

  // Write the main page HTML to the output directory
  writeFileSync('dist/index.html', html);
  writeFileSync('dist/styles.css', css);
  console.log('Main page built: dist/index.html');
}
