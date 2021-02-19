import {openShareWeeklyPlaylists} from '../../utils/share.utils';

export const SharePlaylists = ({slug, weekly}) => {
  const share = async ($event) => {
    $event.stopPropagation();

    await openShareWeeklyPlaylists(slug, weekly);
  };

  return (
    <button
      role="button"
      onClick={async ($event) => await share($event)}
      aria-label={`Share playlists`}
      className="bg-gray-50 dark:bg-gray-700 hover:bg-purple-700 hover:text-white hover:border-purple-300 dark:hover:bg-purple-700 dark:hover:text-white dark:hover:border-purple-700 border border-purple-600 dark:border-gray-600 text-black dark:text-gray-100 transition duration-300 rounded-full px-2 py-1 text-sm">
      Share
    </button>
  );
};
