import {openSharePlaylist} from '../../utils/share.utils';

export const SharePlaylist = ({slug, name, twitter}) => {
  const share = async ($event) => {
    $event.preventDefault();

    await openSharePlaylist(slug, name, twitter);
  };

  return (
    <button
      role="button"
      onClick={($event) => share($event)}
      aria-label={`Share ${name} playlist`}
      className="ml-4 mt-2 hover:text-purple-600 dark:hover:text-purple-300">
      <svg className="h-6 w-6 fill-current" viewBox="0 0 512 512">
        <path
          d="M336 192h40a40 40 0 0140 40v192a40 40 0 01-40 40H136a40 40 0 01-40-40V232a40 40 0 0140-40h40M336 128l-80-80-80 80M256 321V48"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
    </button>
  );
};
