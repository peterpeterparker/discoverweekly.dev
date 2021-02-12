import {getAllPlaylists, getPlaylist} from '../../lib/playlist';

import {Layout} from "../../components/layout/Layout";

const Playlist = ({content}) => {
  return <Layout>
    <main className="bg-black pt-32 text-white">
      <div className="max-w-screen-md m-auto" dangerouslySetInnerHTML={{ __html: content }}></div>
    </main>
  </Layout>;
};

export default Playlist;

export async function getStaticProps({params}) {
  const playlist = await getPlaylist(params);

  return {
    props: playlist,
  };
}

export async function getStaticPaths() {
  const posts = getAllPlaylists();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
