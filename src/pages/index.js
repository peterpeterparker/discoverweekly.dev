import {getAllPlaylistsWithSummary} from '../lib/playlist';

import Header from '../components/header/Header';

import {Layout} from '../components/layout/Layout';
import {Hero} from '../components/hero/Hero';
import {Card} from '../components/card/Card';
import {PrimaryButton} from '../components/button/PrimaryButton';

export const Home = ({playlists}) => {
  return (
    <>
      <Header></Header>

      <Layout>
        <Hero></Hero>

        <main className="bg-gray-50 dark:bg-black pt-10">
          {playlists.map((playlist) => {
            return <Card playlist={playlist} key={playlist.slug}></Card>;
          })}

          <div className="w-full flex flex-col justify-center m-auto w-max py-16 items-center">
            <p className="dark:text-white block mb-2">Contribute now, share your best music tips!</p>

            <PrimaryButton>Submit a pull request</PrimaryButton>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const playlists = await getAllPlaylistsWithSummary();

  return {
    props: {playlists},
  };
}
