import fs from 'fs';
import {join} from 'path';

const format = require('date-fns/format');

const isAfter = require('date-fns/isAfter');
const getWeek = require('date-fns/getWeek');

import matter from 'gray-matter';

import {parse, parseWithSummary} from './utils/markdown.utils';
import {getLastWeekly, getWeekly} from './utils/date.utils';

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

  if (process.env.NODE_ENV === 'development') {
    return slugs.map((slug) => getPlaylistBySlug(slug));
  }

  const lastWeekly = getLastWeekly()

  return slugs.map((slug) => getPlaylistBySlug(slug)).filter((playlist) => !isAfter(new Date(playlist.frontmatter.date), lastWeekly));
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

// TODO: sort playlist
// TODO: wednesday grouping
const groupPlaylists = (allPlaylists) => {
  return allPlaylists.reduce((acc, playlist) => {
    const weekly = getWeekly(new Date(playlist.frontmatter.date));

    const year = format(new Date(playlist.frontmatter.date), 'yyyy');
    const week = `${getWeek(weekly, {weekStartsOn: 1})}`;

    const key = `${year}-${week}`;

    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }

    acc[key].push(playlist);

    return acc;
  }, {});
};
