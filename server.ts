import { resolve, normalize, join } from 'path';

const domain = Bun.env['DOMAIN'] || 'localhost';
const port = Bun.env['PORT'] || 3000;

Bun.serve({
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname === '/' ? '/index.html' : url.pathname;

    // Normalize the path and resolve it to an absolute path
    const basePath = './dist';
    const safePath = resolve(normalize(join(basePath, path)));

    // Ensure the safePath is within the dist directory (no path traversal allowed)
    if (!safePath.startsWith(resolve(basePath))) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      // Attempt to read the file using Bun.file() - Note that Bun.file() might return a special object
      const file = await Bun.file(safePath);

      // Check if file is found, if not, return 404
      if (file) {
        return new Response(file);
      } else {
        console.error(`File not found: ${safePath}`);
        return new Response('File not found', { status: 404 });
      }
    } catch (err: unknown) {
      // Check if err is an instance of Error
      if (err instanceof Error) {
        console.error(`Error reading file: ${err.message}`);
      } else {
        console.error(`Unknown error occurred: ${err}`);
      }
      return new Response('File not found', { status: 404 });
    }
  },
  port: port, // Port number for the server
});

console.log(`Server running at http://${domain}:${port}`);
