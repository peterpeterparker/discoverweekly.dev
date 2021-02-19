import config from '../config.json';

export const playlistUrl = (slug) => `${config.url}/playlist/${slug}`;

export const weeklyPlaylistsUrl = (slug) => `${config.url}/weekly/playlists-${slug}`;
