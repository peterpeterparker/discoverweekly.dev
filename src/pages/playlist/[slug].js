import remark from 'remark';
import html from 'remark-html';

import {getAllPosts, getPostBySlug} from '../../lib/playlist';

const Post = ({content}) => {
  return <div>
    <div
        dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>;
};

export default Post;

export async function getStaticProps({params}) {
  const post = getPostBySlug(params.slug);

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
  const posts = getAllPosts();

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
