import fs from 'fs';
import {join} from 'path';

const dateFormat = require('dateformat');

import matter from 'gray-matter';

import {parse, parseWithSummary} from './utils/markdown.utils';

const postsDirectory = join(process.cwd(), 'content', 'playlists');

const getPlaylistBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {slug: realSlug, frontmatter: data, content};
};

export const getAllPlaylists = () => {
  const slugs = fs.readdirSync(postsDirectory);
  return slugs.map((slug) => getPlaylistBySlug(slug));
};

export const getAllPlaylistsWithSummary = async () => {
  const allPlaylists = getAllPlaylists();

  const promises = allPlaylists.map((playlist) => summary(playlist));
  const allPlaylistsWithSummary = await Promise.all(promises);

  return groupPlaylists(allPlaylistsWithSummary);
};

export const getPlaylist = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);

  return parse(post);
};

const summary = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);
  return parseWithSummary(post);
};

const groupPlaylists = (allPlaylists) => {
  return allPlaylists.reduce((acc, playlist) => {
    const key = dateFormat(new Date(), 'yyyy-mm-dd').toLowerCase();

    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }

    acc[key].push(playlist);

    return acc;
  }, {});
};
