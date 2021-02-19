import {useRouter} from 'next/router';

import {getAllPlaylists, getPlaylist} from '../../lib/playlist';

import {Layout} from '../../components/layout/Layout';
import {Playlist} from '../../components/playlist/Playlist';
import {Author} from '../../components/author/Author';
import {SecondaryButton} from '../../components/button/SecondaryButton';
import Header from '../../components/header/Header';
import {HeaderMetaPlaylist} from '../../components/header/HeaderMetaPlaylist';
import {PlaylistTitle} from '../../components/playlist/PlaylistTitle';

const PlaylistPage = ({content, frontmatter, slug}) => {
  const router = useRouter();

  const navigateRoot = async () => {
    await router.push('/#main');
  };

  return (
    <>
      <Header></Header>
      <HeaderMetaPlaylist frontmatter={frontmatter} slug={slug}></HeaderMetaPlaylist>

      <Layout>
        <main className="bg-gray-50 dark:bg-black pt-16 dark:text-white">
          <PlaylistTitle slug={slug} frontmatter={frontmatter}></PlaylistTitle>

          <Playlist content={content}></Playlist>

          <Author frontmatter={frontmatter} slug={slug}></Author>

          <div className="max-w-screen-md m-auto p-5 mt-12 pb-14 flex justify-center">
            <SecondaryButton action={navigateRoot}>Get more playlists</SecondaryButton>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default PlaylistPage;

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
