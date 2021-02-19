import fs from 'fs';

import config from '../config.json';

import {getAllPlaylists} from './playlist';

import RSS from 'rss';

const generate = () => {
  const feed = new RSS({
    title: config.title,
    site_url: config.url,
    feed_url: `${config.url}/feed.xml`,
  });

  const playlists = getAllPlaylists();

  playlists.map((playlist) => {
    feed.item({
      title: `${playlist.frontmatter.name} Playlist`,
      guid: playlist.slug,
      url: `${config.url}/playlist/${playlist.slug}`,
      date: playlist.frontmatter.date,
      description: playlist.frontmatter.description,
      author: playlist.frontmatter.name,
    });
  });

  return feed.xml({indent: true});
};

export const generateRSS = () => {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const rss = generate();

  fs.writeFileSync('./public/rss.xml', rss);
}
