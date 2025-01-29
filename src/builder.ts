import { mkdirSync, existsSync } from 'fs';
import { fetchEntries } from './contentful';
import { buildAboutPage } from './about';
import { buildMainPage } from './index';
import { buildPostPages } from './blogposts';

// Ensure the 'dist' directory exists
if (!existsSync('dist')) {
  mkdirSync('dist');
}

// Fetch data from Contentful and generate the pages
async function buildSite() {
  const posts = await fetchEntries('blogPosts');

  // Build the main page with the navbar
  await buildMainPage(posts);
  //build the about page
  // await buildAboutPage(aboutModel);

  // Build individual pages for each blog post
  await buildPostPages(posts);
}

// Run the build process
async function build() {
  await buildSite(); // Build the site
}

build().catch(console.error);
