import React, {useRef, useEffect} from 'react';

import {getAllPlaylists, getPlaylist} from '../../lib/playlist';

import {Layout} from "../../components/layout/Layout";

import {useWindowSize} from 'react-use';

import { defineCustomElements as deckDeckGoYoutubeElement } from '@deckdeckgo/youtube/dist/loader';
deckDeckGoYoutubeElement();

const Playlist = ({content}) => {

  /* Video size */

  const {width} = useWindowSize();

  const mainRef = useRef();

  useEffect(() => {
    onWindowResize();
  }, [width, mainRef]);

  const onWindowResize = async () => {
    if (!mainRef || !mainRef.current) {
      return;
    }

    const elements = document.querySelectorAll('deckgo-youtube');

    if (!elements) {
      return;
    }

    for (const element of Array.from(elements)) {
      const width = Math.max(width, mainRef.current.offsetWidth);
      const height = (width * 9) / 16;
      await element.updateIFrame(width, height);
    }
  }

  /* Video lazy loading */

  let videoObserver = undefined;

  useEffect(() => {
    if (!mainRef || !mainRef) {
      return;
    }

    if (window && 'IntersectionObserver' in window) {
      deferVideoIntersectionObserverLoad();
    } else {
      unfortunatelyLoadVideoNow();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainRef]);

  const deferVideoIntersectionObserverLoad = () => {
    videoObserver = new IntersectionObserver(onVideoIntersection, {
      rootMargin: '100px 0px',
      threshold: 0.25,
    });

    const elements = document.querySelectorAll('deckgo-youtube');

    if (elements) {
      Array.from(elements).forEach((element) => {
        videoObserver.observe(element);
      });
    }
  };

  const unfortunatelyLoadVideoNow = async () => {
    const elements = document.querySelectorAll('deckgo-youtube');

    if (elements && elements.length > 0) {
      const promises = Array.from(elements).map((element) => element.lazyLoadContent());
      await Promise.all(promises);
    }
  };

  const onVideoIntersection = async (entries) => {
    if (!entries || entries.length <= 0) {
      return;
    }

    await handleVideoIntersection(entries);
  };

  const handleVideoIntersection = async (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (videoObserver && entry.target) {
          await entry.target.lazyLoadContent();
          videoObserver.unobserve(entry.target);
        }
      }
    }
  };

  return <Layout>
    <main className="bg-black pt-16 text-white min-h-screen" ref={mainRef}>
      <div className="max-w-screen-md m-auto p-5" dangerouslySetInnerHTML={{ __html: content }}></div>
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
