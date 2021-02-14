import config from '../config.json';

export const playlistUrl = (slug) => `${config.url}/playlist/${slug}`;
