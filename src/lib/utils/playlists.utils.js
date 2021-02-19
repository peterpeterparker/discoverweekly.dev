import fs from 'fs';
import {join} from 'path';

import matter from 'gray-matter';

const format = require('date-fns/format');
const getWeek = require('date-fns/getWeek');

import {parseWithSummary} from './markdown.utils';
import {getWeekly} from './date.utils';

export const postsDirectory = join(process.cwd(), 'content', 'playlists');

export const getPlaylistBySlug = (slug) => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);

  return {slug: realSlug, frontmatter: data, content};
};

export const summary = async (playlist) => {
  const post = getPlaylistBySlug(playlist.slug);
  return parseWithSummary(post);
};

export const groupPlaylists = (allPlaylists) => {
  return allPlaylists.reduce((acc, playlist) => {
    const weekly = getWeekly(new Date(playlist.frontmatter.date));

    const year = format(new Date(playlist.frontmatter.date), 'yyyy');
    const week = `${getWeek(weekly, {weekStartsOn: 1})}`;

    const key = `${year}-${week}`;

    if (!acc.hasOwnProperty(key)) {
      acc[key] = {
        weekly: format(weekly, 'yyyy-MM-dd'),
        playlists: []
      };
    }

    acc[key].playlists.push(playlist);

    return acc;
  }, {});
};

