import React from 'react';

import Link from 'next/link';

import {Card} from '../card/Card';

import {formatDate} from '../../utils/date.utils';

export const Playlists = ({playlists}) => {
  return (
    <>
      {Object.keys(playlists).map((key) => (
        <div key={key}>
          {renderPlaylistNumber(playlists[key].weekly)}

          {playlists[key].playlists.map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}
        </div>
      ))}
    </>
  );

  function renderPlaylistNumber(weekly) {
    return (
      <Link as={`/weekly/playlists-${weekly}`} href="/weekly/[slug]">
        <h2 className="flex justify-center items-center cursor-pointer px-5 pt-6 text-sm sm:text-lg text-gray-600 dark:text-gray-50 hover:text-purple-600 dark:hover:text-purple-300 underline tracking-wide">
          {formatDate(weekly)}
        </h2>
      </Link>
    );
  }
};
