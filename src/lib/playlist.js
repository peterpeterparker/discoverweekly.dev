import fs from 'fs';
import {join} from 'path';

import matter from 'gray-matter';
import remark from "remark";
import html from "remark-html";

import { JSDOM } from 'jsdom';

const postsDirectory = join(process.cwd(), 'content', 'playlists');

const getPlaylistBySlug = (slug) => {
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
  const allPlaylists = shuffle(getAllPlaylists());

  const promises = allPlaylists.map(playlist => summary(playlist));

  return await Promise.all(promises);
}

export const getPlaylist = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);

  const markdown = await remark()
      .use(html)
      .process(post.content || '');
  const content = format(markdown.toString());

  return {
    ...playlist,
    content
  };
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

// https://stackoverflow.com/a/12646864/5404186
const shuffle = (playlists) => {
  for (let i = playlists.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [playlists[i], playlists[j]] = [playlists[j], playlists[i]];
  }

  return playlists;
}

const format = (content) => {
  const { window } = new JSDOM(`<!DOCTYPE html>${content}`);

  const elements = window.document.querySelectorAll('*');

  Array.from(elements)?.map(element => {
    if (element.nodeName === 'HR') {
        element.className =  'w-24 my-2 border-t-2 border-gray-600';
    } else if (element.nodeName === 'H1') {
        element.className = 'font-bold text-2xl lg:text-4xl mb-4 mt-8'
    } else if (element.nodeName === 'P') {
      element.className =  'break-words';
    }

    return element;
  });

  return window.document.documentElement.outerHTML;
}
