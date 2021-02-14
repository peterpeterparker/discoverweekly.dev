import {Card} from '../card/Card';

export const Playlists = ({playlists}) => {
  return (
    <>
      {Object.keys(playlists).map((key, i) => (
        <div key={key}>
          {renderPlaylistNumber(i)}

          <hr className="w-24 pb-6 border-t-2 border-purple-300 m-auto" />

          {playlists[key].map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}
        </div>
      ))}
    </>
  );

  function renderPlaylistNumber(i) {
    return (
      <h2 className="flex justify-center items-end px-5 pt-6 text-sm sm:text-lg text-gray-600 dark:text-gray-50 tracking-wide">
        Weekly <span className="text-xs mb-0.5 sm:mb-1 ml-2">#</span>
        {(i + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </h2>
    );
  }
};
