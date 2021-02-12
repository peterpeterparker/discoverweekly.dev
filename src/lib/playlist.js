import fs from 'fs';
import {join} from 'path';

import matter from 'gray-matter';
import remark from "remark";
import html from "remark-html";

import { JSDOM } from 'jsdom';

const postsDirectory = join(process.cwd(), 'content', 'playlists');

export const getPlaylistBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {slug: realSlug, frontmatter: data, content};
}

export const getAllPlaylists = () => {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => getPlaylistBySlug(slug));
}

export const getAllPlaylistsWithSummary = async () => {
  const allPlaylists = getAllPlaylists();

  const promises = allPlaylists.map(playlist => summary(playlist));

  return await Promise.all(promises);
}

const summary = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);

  const markdown = await remark()
      .use(html)
      .process(post.content || '');
  const content = markdown.toString();

  const { window } = new JSDOM(`<!DOCTYPE html>${content}`);

  const title = window.document.querySelector("h1:first-of-type")?.outerHTML;
  const text = window.document.querySelector("p:first-of-type")?.outerHTML;

  return {
    ...post,
    content,
    summary: {
      title,
      text
    }
  };
}
