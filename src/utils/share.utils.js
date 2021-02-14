import {isMobile as detectMobile} from '@deckdeckgo/utils';

import config from '../config.json';

import {playlistUrl} from './playlist.utils';

export const openShareDiscoverWeekly = async () => {
  if (isMobile()) {
    await shareMobile({
      text: config.description,
      url: config.url,
    });
  } else {
    await shareDiscoverWeeklyDesktop();
  }
};

export const openSharePlaylist = async (slug, name, twitter) => {
  const url = playlistUrl(slug);

  if (isMobile()) {
    await shareMobile({
      text: `${name} playlist on ${config.title}`,
      url,
    });
  } else {
    await sharePlaylistDesktop(url, name, twitter);
  }
};

const isMobile = () => navigator && navigator.share && detectMobile();

const shareDiscoverWeeklyDesktop = async () => {
  const shareOptions = {
    displayNames: true,
    config: [
      {
        twitter: {
          socialShareText: `Checkout ${config.title} by ${config.twitterUsername} 🤟`,
          socialShareUrl: config.url,
          socialSharePopupWidth: 300,
          socialSharePopupHeight: 400,
        },
      },
      {
        linkedin: {
          socialShareUrl: config.url,
        },
      },
      {
        email: {
          socialShareBody: `Checkout ${config.title} ${config.url}`,
        },
      },
      {
        whatsapp: {
          socialShareUrl: config.url,
        },
      },
      {
        copy: {
          socialShareUrl: config.url,
        },
      },
      {
        hackernews: {
          socialShareUrl: config.url,
        },
      },
    ],
  };

  await shareDesktop(shareOptions);
};

const sharePlaylistDesktop = async (url, name, twitter) => {
  const shareOptions = {
    displayNames: true,
    config: [
      {
        twitter: {
          socialShareText: `Checkout ${twitter ? '@' + twitter : name} playlist on ${config.title} 🤟`,
          socialShareUrl: url,
          socialSharePopupWidth: 300,
          socialSharePopupHeight: 400,
        },
      },
      {
        linkedin: {
          socialShareUrl: url,
        },
      },
      {
        email: {
          socialShareBody: `Checkout ${name} playlist ${url}`,
        },
      },
      {
        whatsapp: {
          socialShareUrl: url,
        },
      },
      {
        copy: {
          socialShareUrl: url,
        },
      },
      {
        hackernews: {
          socialShareUrl: url,
        },
      },
    ],
  };

  await shareDesktop(shareOptions);
};

const shareMobile = async (data) => {
  try {
    await navigator.share(data);
  } catch (err) {
    // Do not display error such as aborted by the user
  }
};

const shareDesktop = async (shareOptions) => {
  const webSocialShare = document.querySelector('web-social-share');

  if (!webSocialShare) {
    return;
  }

  webSocialShare.share = shareOptions;
  webSocialShare.show = true;
};
