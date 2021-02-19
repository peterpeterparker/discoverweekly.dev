const fs = require('fs');
const {join} = require('path');

const config = require('../src/config.json');

const {TwitterClient} = require('twitter-api-client');

const format = require('date-fns/format');
const addDays = require('date-fns/addDays');
const isAfter = require('date-fns/isAfter');

const matter = require('gray-matter');

const tweetNewPlaylists = async () => {
  const playlists = getAllPlaylists();

  if (!playlists || !playlists.playlists) {
    console.log('No new playlists, no tweet.');
    return;
  }

  const status = prepareTweet(playlists);

  await tweet(status);
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

// I have to rewrite this instead of using existing functions because they don't play well at build time (https://twitter.com/daviddalbusco/status/1362836287103897612)
// Babel solves the issue but then breaks next.js build 😩
const getAllPlaylists = () => {
  const postsDirectory = join(process.cwd(), 'content', 'playlists');

  const slugs = fs.readdirSync(postsDirectory);

  const allPlaylists = slugs.map((slug) => {
    const fileContents = fs.readFileSync(join(postsDirectory, slug), 'utf8');
    const {data} = matter(fileContents);

    return {
      frontmatter: data,
    };
  });

  // TODO: DELETE ME TEST
  const thisWeekWednesday = addDays(new Date(), -2);

  // We assume the batch runs only on Wednesdays
  const todayWednesday = thisWeekWednesday;
  const wednesdayLastWeek = addDays(todayWednesday, -7);

  return {
    weekly: format(thisWeekWednesday, 'yyyy-MM-dd'),
    playlists: allPlaylists.filter(
      (playlist) =>
        !isAfter(new Date(playlist.frontmatter.date), todayWednesday) && isAfter(new Date(playlist.frontmatter.date), wednesdayLastWeek)
    ),
  };
};

(async () => {
  try {
    await tweetNewPlaylists();
  } catch (err) {
    console.error(err);
  }
})();
