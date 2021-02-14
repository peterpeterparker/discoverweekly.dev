import config from '../../config.json';

import {Twitter} from '../links/Twitter';
import {GitHub} from '../links/GitHub';
import {ShareDiscoverWeekly} from '../share/ShareDiscoverWeekly';

export const Social = () => {
  return (
    <div className="flex pt-8">
      <GitHub url={config.github} label="GitHub" small={true} color="text-white dark:text-white"></GitHub>

      <Twitter
        url="https://twitter.com/daviddalbusco"
        label={`Twitter @daviddalbusco`}
        small={true}
        color="text-white dark:text-white"></Twitter>

      <ShareDiscoverWeekly></ShareDiscoverWeekly>
    </div>
  );
};
