import React, {useRef, useEffect, useState} from 'react';

import {useWindowSize} from '@react-hook/window-size';

import {defineCustomElements as deckDeckGoYoutubeElement} from '@deckdeckgo/youtube/dist/loader';
deckDeckGoYoutubeElement();

export const Video = ({content}) => {
  /* Video size */

  const [windowWidth] = useWindowSize();
  const [videoSize, setVideoSize] = useState(undefined);

  const containerRef = useRef();

  useEffect(() => {
    onWindowResize();
  }, [windowWidth, containerRef]);

  useEffect(() => {
    onVideoResize();
  }, [videoSize]);

  const onWindowResize = async () => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const css = window.getComputedStyle(containerRef.current);
    const padding = parseInt(css.paddingLeft) + parseInt(css.paddingRight);

    const width = Math.min(windowWidth, 768) - padding;
    const height = (width * 9) / 16;

    applySize(width, height);

    setVideoSize({
      width,
      height,
    });
  };

  const applySize = (width, height) => {
    const elements = document.querySelectorAll('div.video');

    if (elements) {
      Array.from(elements).forEach((element) => {
        element.style.minHeight = `${height}px`;
        element.style.height = `${height}px`;
        element.style.width = `${width}px`;

        element.firstChild.height = height;
        element.firstChild.width = width;
      });
    }
  };

  const onVideoResize = async () => {
    if (!videoSize) {
      return;
    }

    const elements = document.querySelectorAll('deckgo-youtube');

    if (!elements) {
      return;
    }

    for (const element of Array.from(elements)) {
      await element.updateIFrame(videoSize.width, videoSize.height);
    }
  };

  /* Video lazy loading */

  let videoObserver = undefined;

  useEffect(() => {
    if (!containerRef || !containerRef.current || !videoSize) {
      return;
    }

    if (window && 'IntersectionObserver' in window) {
      deferVideoIntersectionObserverLoad();
    } else {
      unfortunatelyLoadVideoNow();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, videoSize]);

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

  return <section ref={containerRef} className="max-w-screen-md m-auto p-5" dangerouslySetInnerHTML={{__html: content}}></section>;
};
