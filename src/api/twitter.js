import {getAllPlaylists} from '../lib/playlist';

import config from '../config.json';

const {TwitterClient} = require('twitter-api-client');

const format = require('date-fns/format');
const getWeek = require('date-fns/getWeek');
const addDays = require('date-fns/addDays');

module.exports = async (req, res) => {
  try {
    const allPlaylists = getAllPlaylists();

    // TODO: DELETE ME TEST
    const thisWeekWednesday = addDays(new Date(), -2);

    // We assume the batch runs only on Wednesday once
    const wednesday = `${format(thisWeekWednesday, 'yyyy')}-${getWeek(new Date(), {weekStartsOn: 1})}`;

    const playlists = allPlaylists[wednesday];

    if (!playlists || !playlists.playlists) {
      res.json({
        result: `No playlists, no tweet.`,
      });

      return;
    }

    const status = prepareTweet(playlists);

    await tweet(status);

    res.json({
      result: `Tweet success.`,
    });
  } catch (err) {
    res.json({
      result: `Error ${err}.`,
    });
  }
};

const tweet = async (status) => {
  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_API_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  await twitterClient.tweets.statusesUpdate({status});
};

const prepareTweet = (playlists) => {
  const placeHolder = '{0}';

  const label = `New weekly playlists ${placeHolder}${config.url}/weekly/playlists-${playlists.weekly}`;

  const maxLength = 280 - label.length - placeHolder.length;

  const twitterNames = playlists.playlists
    .filter((playlist) => playlist.frontmatter.twitter && playlist.frontmatter.twitter !== '')
    .map((playlist) => playlist.frontmatter.twitter);

  let twitterCredits = '';
  if (twitterNames && twitterNames.length > 0) {
    twitterNames.forEach((twitterName) => {
      if (twitterCredits.length + twitterName.length <= maxLength) {
        twitterCredits += `@${twitterName} `;
      }
    });
  }

  return label.replace('{0}', twitterCredits);
};
