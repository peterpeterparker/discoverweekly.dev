import fs from 'fs';
import {join} from 'path';

import matter from 'gray-matter';
import remark from "remark";
import html from "remark-html";

import { JSDOM } from 'jsdom';

const postsDirectory = join(process.cwd(), 'content', 'playlists');

const youtubeMatch = /{%\syoutube\s(.*)\s%}/g;
const spotifyMatch = /{%\sspotify\s(playlist|track|artist)\s(.*)\s%}/g;

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
    ...post,
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
        element.className =  'w-24 mt-8 py-4 border-t-2 m-auto border-gray-200 dark:border-gray-600';
    } else if (element.nodeName === 'H1') {
        element.className = 'font-bold text-2xl lg:text-4xl mb-4 mt-10'
    } else if (element.nodeName === 'P') {
      element.className =  'break-words';

      const youtube = youtubeMatch.exec(element.textContent);
      if (youtube) {
        const div = formatYoutube(window, youtube);
        element.parentNode.replaceChild(div, element);
      }

      const spotify = spotifyMatch.exec(element.textContent);
      if (spotify) {
        const iframe = formatSpotify(window, spotify);
        element.parentNode.replaceChild(iframe, element);
      }
    }


    return element;
  });

  return window.document.documentElement.outerHTML;
}

const formatYoutube = (window, youtube) => {
  const video = window.document.createElement('deckgo-youtube');
  video.setAttribute('src', `https://www.youtube.com/watch?v=${youtube?.[1]}`);

  const div = window.document.createElement('div');
  div.className = 'youtube';

  div.appendChild(video);

  return div;
}

const formatSpotify = (window, spotify) => {
  const iframe = window.document.createElement('iframe');
  iframe.setAttribute('data-src', `https://open.spotify.com/embed/${spotify?.[1]}/${spotify?.[2]}`);
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('allow', 'encrypted-media');

  const div = window.document.createElement('div');
  div.className = 'spotify';

  div.appendChild(iframe);

  return div;
}
