import Head from 'next/head';
import styles from '../styles/Home.module.css';

import Link from 'next/link'

import {getAllPosts} from "../lib/playlist";

export const Home = ({ allPosts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {
          allPosts.map(post => {
            return <Link as={`/playlist/${post.slug}`} href="/playlist/[slug]" key={post.slug}>
              {post.frontmatter.name}
            </Link>
          })
        }
      </main>
    </div>
  );
}

export default Home;

export async function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: { allPosts },
  }
}
