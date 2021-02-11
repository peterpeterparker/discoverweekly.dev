import styles from '../styles/Home.module.scss';

import Link from 'next/link';

import {getAllPosts} from '../lib/playlist';

import Header from '../components/header/Header';

export const Home = ({allPosts}) => {
  return (
    <>
        <Header></Header>

        <div className={styles.container}>

            <main>
                <div className="container mx-auto px-4 mb-16 flex justify-center flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {allPosts.map((post) => {
                            return (
                                <Link as={`/playlist/${post.slug}`} href="/playlist/[slug]" key={post.slug}>
                                    {post.frontmatter.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </main>
        </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {allPosts},
  };
}
