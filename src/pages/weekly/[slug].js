import React from 'react';

import {useRouter} from 'next/router';

import {getAllPlaylistsGrouped, getWeeklyPlaylists} from '../../lib/playlist';

import Header from '../../components/header/Header';
import {HeaderMeta} from '../../components/header/HeaderMeta';
import {Layout} from '../../components/layout/Layout';
import {Card} from '../../components/card/Card';
import {PlaylistsTitle} from '../../components/playlist/PlaylistsTitle';
import {SecondaryButton} from '../../components/button/SecondaryButton';

const WeeklyPage = ({slug, allPlaylists}) => {
  const {weekly, playlists} = allPlaylists;

  const router = useRouter();

  const navigateRoot = async () => {
    await router.push('/#main');
  };

  return (
    <>
      <Header></Header>
      <HeaderMeta></HeaderMeta>

      <Layout>
        <main className="bg-gray-50 dark:bg-black pt-16 dark:text-white">
          <PlaylistsTitle weekly={weekly} slug={slug}></PlaylistsTitle>

          {playlists.map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}

          <div className="max-w-screen-md m-auto p-5 mt-12 pb-14 flex justify-center">
            <SecondaryButton action={navigateRoot}>Get more playlists</SecondaryButton>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default WeeklyPage;

export async function getStaticProps({params}) {
  const playlists = await getWeeklyPlaylists(params);

  return {
    props: playlists,
  };
}

export async function getStaticPaths() {
  const playlists = await getAllPlaylistsGrouped();

  return {
    paths: Object.keys(playlists).map((key) => {
      return {
        params: {
          slug: `playlists-${playlists[key].weekly}`,
        },
      };
    }),
    fallback: false,
  };
}
