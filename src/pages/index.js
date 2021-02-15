import dynamic from 'next/dynamic';

import {getAllPlaylistsWithSummary} from '../lib/playlist';
import {getSpheres} from '../lib/scene';
import {generateRSS} from '../lib/rss';

import config from '../config.json';

import Header from '../components/header/Header';
import {Layout} from '../components/layout/Layout';
import {Hero} from '../components/hero/Hero';
import {HeaderMeta} from '../components/header/HeaderMeta';
import {ShareDesktop} from '../components/share/ShareDesktop';
import {SecondaryButton} from '../components/button/SecondaryButton';
import {Playlists} from '../components/playlists/Playlists';
const Background = dynamic(() => import('../components/background/Background'), {ssr: false});

export const Home = ({playlists, spheres}) => {
  const navigatePullRequest = () => {
    window.location = `${config.github}#contributing`;
  };

  return (
    <>
      <Header></Header>
      <HeaderMeta></HeaderMeta>

      <Layout>
        <Hero>
          <Background spheres={spheres}></Background>
        </Hero>

        <main className="bg-gray-50 dark:bg-black pt-10" id="main">
          <Playlists playlists={playlists}></Playlists>

          <div className="w-full flex flex-col justify-center m-auto w-max pt-20 pb-16 items-center">
            <p className="dark:text-white block mb-2 mt-2">Contribute now, share your best music tips!</p>

            <SecondaryButton action={navigatePullRequest}>Submit a pull request</SecondaryButton>
          </div>
        </main>
      </Layout>

      <ShareDesktop></ShareDesktop>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const playlists = await getAllPlaylistsWithSummary();
  const spheres = getSpheres();

  generateRSS();

  return {
    props: {
      playlists,
      spheres,
    },
  };
}
