import fs from 'fs';
import {join} from 'path';

const format = require('date-fns/format');
const setDay = require('date-fns/setDay');
const isAfter = require('date-fns/isAfter');
const getDay = require('date-fns/getDay');
const addWeeks = require('date-fns/addWeeks');

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

  const today = getDay(new Date());
  // On Mondays and Tuesdays last Wednesday should be use as reference.
  const wednesday = setDay(today === 1 || today === 2 ? addWeeks(new Date(), -1) : new Date(), 3, {weekStartsOn: 1});

  return slugs.map((slug) => getPlaylistBySlug(slug)).filter((playlist) => !isAfter(new Date(playlist.frontmatter.date), wednesday));
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
    const key = format(new Date(), 'yyyy-MM-dd').toLowerCase();

    if (!acc.hasOwnProperty(key)) {
      acc[key] = [];
    }

    acc[key].push(playlist);

    return acc;
  }, {});
};
