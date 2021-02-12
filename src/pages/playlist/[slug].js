import remark from 'remark';
import html from 'remark-html';

import {getAllPlaylists, getPlaylistBySlug} from '../../lib/playlist';

const Playlist = ({content}) => {
  return <div>
    <div
        dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>;
};

export default Playlist;

export async function getStaticProps({params}) {
  const post = getPlaylistBySlug(params.slug);

  const markdown = await remark()
    .use(html)
    .process(post.content || '');
  const content = markdown.toString();

  return {
    props: {
      ...post,
      content,
    },
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
