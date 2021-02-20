import config from '../../config.json';

import {Twitter} from '../links/Twitter';
import {GitHub} from '../links/GitHub';
import {ShareDiscoverWeekly} from '../share/ShareDiscoverWeekly';

export const Social = () => {
  return (
    <div className="flex pt-8">
      <GitHub url={config.github} label="GitHub" small={true} color="text-white dark:text-white"></GitHub>

      <Twitter
        url={`https://twitter.com/${config.twitterUsername}`}
        label={`Twitter`}
        small={true}
        color="text-white dark:text-white"></Twitter>

      <ShareDiscoverWeekly></ShareDiscoverWeekly>

      {renderRSS()}
    </div>
  );

  function renderRSS() {
    return (
      <a
        href={'/rss.xml'}
        rel="noopener norefferer"
        aria-label={'RSS feed'}
        className="ml-4 mt-2 hover:text-purple-60 text-white dark:text-white">
        <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
          <path d="M108.56 342.78a60.34 60.34 0 1060.56 60.44 60.63 60.63 0 00-60.56-60.44z" />
          <path d="M48 186.67v86.55c52 0 101.94 15.39 138.67 52.11s52 86.56 52 138.67h86.66c0-151.56-125.66-277.33-277.33-277.33z" />
          <path d="M48 48v86.56c185.25 0 329.22 144.08 329.22 329.44H464C464 234.66 277.67 48 48 48z" />
        </svg>
      </a>
    );
  }
};
