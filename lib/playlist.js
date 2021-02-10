import fs from 'fs';
import {join} from 'path';

import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), 'playlists');

export const getPostBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {slug: realSlug, frontmatter: data, content};
}

export const getAllPosts = () => {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => getPostBySlug(slug));
}
