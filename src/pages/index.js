import Link from 'next/link';

import {getAllPlaylists} from '../lib/playlist';

import Header from '../components/header/Header';

import {Layout} from '../components/layout/Layout';
import {Hero} from '../components/hero/Hero';
import {Card} from '../components/card/Card';

export const Home = ({playlists}) => {
  return (
    <>
      <Header></Header>

      <Layout>
        <Hero></Hero>
      </Layout>

      <main className="bg-black pt-20">
        {playlists.map((playlist) => {
          return <Card playlist={playlist} key={playlist.slug}></Card>;
        })}
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const playlists = getAllPlaylists();

  return {
    props: {playlists},
  };
}
