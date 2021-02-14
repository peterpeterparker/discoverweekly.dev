// https://stackoverflow.com/a/12646864/5404186
const shuffle = (playlists) => {
    for (let i = playlists.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlists[i], playlists[j]] = [playlists[j], playlists[i]];
    }

    return playlists;
}

