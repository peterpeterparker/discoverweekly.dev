import {Card} from '../card/Card';
import {formatDate} from '../../utils/date.utils';

export const Playlists = ({playlists}) => {
  return (
    <>
      {Object.keys(playlists).map((key) => (
        <div key={key}>
          {renderPlaylistNumber(playlists[key].weekly)}

          <hr className="w-24 border-t-2 border-purple-300 m-auto" />

          {playlists[key].playlists.map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}
        </div>
      ))}
    </>
  );

  function renderPlaylistNumber(weekly) {
    return (
      <h2 className="flex justify-center items-center px-5 pt-6 text-sm sm:text-lg text-gray-600 dark:text-gray-50 tracking-wide">
        {formatDate(weekly)}
      </h2>
    );
  }
};
