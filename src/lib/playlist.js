import fs from 'fs';

const isAfter = require('date-fns/isAfter');

import {parse} from './utils/markdown.utils';
import {compare, getLastWeekly} from './utils/date.utils';
import {getPlaylistBySlug, groupPlaylists, postsDirectory, summary} from './utils/playlists.utils';

export const getAllPlaylists = () => {
  const slugs = fs.readdirSync(postsDirectory);

  if (process.env.NODE_ENV === 'development') {
    return slugs.map((slug) => getPlaylistBySlug(slug)).sort((a, b) => compare(a, b));
  }

  const lastWeekly = getLastWeekly();

  return slugs
    .map((slug) => getPlaylistBySlug(slug))
    .filter((playlist) => !isAfter(new Date(playlist.frontmatter.date), lastWeekly))
    .sort((a, b) => compare(a, b));
};

export const getAllPlaylistsGrouped = async () => {
  const allPlaylists = getAllPlaylists();

  const promises = allPlaylists.map((playlist) => summary(playlist));
  const allPlaylistsWithSummary = await Promise.all(promises);

  return groupPlaylists(allPlaylistsWithSummary);
};

export const getPlaylist = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);

  return parse(post);
};

export const getWeeklyPlaylists = async (weekly) => {
  const allPlaylists = await getAllPlaylistsGrouped();
  const date = weekly.slug.match(/\d{4}-\d{2}-\d{2}/g)?.[0];

  return Object.keys(allPlaylists).map((key) => allPlaylists[key]).find(playlists => playlists.weekly === date);
};
