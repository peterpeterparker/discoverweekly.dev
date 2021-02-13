import {getAllPlaylists, getPlaylist} from '../../lib/playlist';

import {Layout} from "../../components/layout/Layout";
import {Playlist} from "../../components/playlist/Playlist";
import {Author} from "../../components/author/Author";
import {SecondaryButton} from "../../components/button/SecondaryButton";

import {formatDate} from "../../utils/date.utils";
import Header from "../../components/header/Header";
import {HeaderMetaPlaylist} from "../../components/header/HeaderMetaPlaylist";

const PlaylistPage = ({content, frontmatter, slug}) => {

  return <>
    <Header></Header>
    <HeaderMetaPlaylist frontmatter={frontmatter} slug={slug}></HeaderMetaPlaylist>

    <Layout>
      <main className="bg-gray-50 dark:bg-black pt-16 dark:text-white">
        {renderTitle()}

        <Playlist content={content}></Playlist>

        <Author frontmatter={frontmatter}></Author>

        <div className="max-w-screen-md m-auto p-5 mt-8 pb-10 flex justify-center">
          <SecondaryButton>
            Get more playlists
          </SecondaryButton>
        </div>
      </main>
    </Layout>
    </>;

  function renderTitle() {
    const {name, tags, date} = frontmatter;

    return <section className="max-w-screen-md m-auto p-5">
      <h1 className="font-bold text-2xl xs:text-4xl sm:text-6xl lg:text-8xl my-2 sm:my-4">{name} Playlist</h1>
      <p className="text-gray-600 dark:text-gray-400">{formatDate(date)}</p>
      {
        tags ? <p className="text-gray-600 dark:text-gray-400">{tags}</p> : undefined
      }
    </section>
  }
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
