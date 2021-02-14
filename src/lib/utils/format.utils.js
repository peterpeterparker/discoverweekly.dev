import {JSDOM} from 'jsdom';

const youtubeMatch = /{%\syoutube\s(.*)\s%}/g;
const spotifyMatch = /{%\sspotify\s(playlist|track|artist)\s(.*)\s%}/g;

export const format = (content) => {
  const {window} = new JSDOM(`<!DOCTYPE html>${content}`);

  const elements = window.document.querySelectorAll('*');

  Array.from(elements)?.map((element) => {
    if (element.nodeName === 'HR') {
      element.className = 'w-24 mt-8 py-4 border-t-2 m-auto border-gray-200 dark:border-gray-600';
    } else if (element.nodeName === 'H1') {
      element.className = 'font-bold text-4xl mb-4 mt-10';
    } else if (element.nodeName === 'P') {
      element.className = 'break-words';

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
};

const formatYoutube = (window, youtube) => {
  const video = window.document.createElement('deckgo-youtube');
  video.setAttribute('src', `https://www.youtube.com/watch?v=${youtube?.[1]}`);

  const div = window.document.createElement('div');
  div.className = 'youtube';

  div.appendChild(video);

  return div;
};

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
};
