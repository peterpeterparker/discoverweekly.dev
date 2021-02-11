import styles from '../styles/Home.module.scss';

import Link from 'next/link';

import {getAllPosts} from '../lib/playlist';

import Header from '../components/header/Header';

import {Layout} from "../components/layout/Layout";
import {Hero} from "../components/hero/Hero";

export const Home = ({allPosts}) => {
  return (
    <>
        <Header></Header>

        <Layout>
            <Hero></Hero>
        </Layout>

        <div className={styles.container}>

            <main style={{minHeight: '2000px'}}>
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
