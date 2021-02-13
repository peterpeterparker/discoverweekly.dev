import dynamic from 'next/dynamic';

import {getAllPlaylistsWithSummary} from '../lib/playlist';
import {getSpheres} from '../lib/scene';

import Header from '../components/header/Header';

import {Layout} from '../components/layout/Layout';
import {Hero} from '../components/hero/Hero';
import {Card} from '../components/card/Card';
import {SharePlaylist} from '../components/links/SharePlaylist';
import {HeaderMeta} from '../components/header/HeaderMeta';
import {Share} from '../components/share/Share';
const Background = dynamic(() => import('../components/background/Background'), {ssr: false});

export const Home = ({playlists, spheres}) => {
  return (
    <>
      <Header></Header>
      <HeaderMeta></HeaderMeta>

      <Layout>
        <Hero>
            <Background spheres={spheres}></Background>
        </Hero>

        <main className="bg-gray-50 dark:bg-black pt-10" id="main">
          {playlists.map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}

          <div className="w-full flex flex-col justify-center m-auto w-max py-16 items-center">
            <p className="dark:text-white block mb-2">Contribute now, share your best music tips!</p>

            <SharePlaylist label="Submit a pull request"></SharePlaylist>
          </div>
        </main>
      </Layout>

      <Share></Share>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const playlists = await getAllPlaylistsWithSummary();
  const spheres = getSpheres();

  return {
    props: {
      playlists,
      spheres,
    },
  };
}
