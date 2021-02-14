import {useEffect, useRef, useState} from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';

import config from '../../config.json';

import styles from './Navbar.module.scss';

import {ContributePlaylist} from '../contribute/ContributePlaylist';
const Theme = dynamic(() => import('../theme/Theme'), {ssr: false});

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const scrolledRef = useRef(scrolled);
  const setScrolledState = (data) => {
    scrolledRef.current = data;
    setScrolled(data);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => window.removeEventListener('scroll', handleScroll, false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (!scrolledRef) {
      return;
    }

    const scrolledSize = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollTrigger = scrolledSize > 16;

    if (scrolledRef.current !== scrollTrigger) {
      setScrolledState(scrollTrigger);
    }
  };

  return (
    <nav className={`bg-gray-800 fixed top-0 w-full z-10 ${styles.nav} ${scrolled ? styles.fix : ''}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/" className="flex-shrink-0 flex items-center sm:pl-2" alt={`${config.title} logo`} >
              <svg className="w-24 h-24 text-white" viewBox="0 0 8892 8892"><path fill="#7C3AED" d="M4170.22,4673.73l-1284.85,1284.85c-61.969,61.966 -162.433,61.966 -224.393,0l-149.865,-149.859c-61.861,-61.861 -61.977,-162.119 -0.263,-224.127l1018.28,-1023.06l-1018.27,-1023.06c-61.714,-62.007 -61.595,-162.269 0.266,-224.13l149.856,-149.856c61.966,-61.968 162.43,-61.968 224.393,0l1284.85,1284.85c61.966,61.959 61.966,162.424 0,224.392Zm2525.62,1210.05l0,-211.561c0,-87.631 -71.036,-158.67 -158.669,-158.67l-2009.82,-0c-87.633,-0 -158.67,71.039 -158.67,158.67l0,211.561c0,87.631 71.037,158.67 158.67,158.67l2009.82,0c87.633,0 158.669,-71.039 158.669,-158.67Z"/><path fill="currentColor" d="M3901.41,4404.93l-1284.85,1284.85c-61.968,61.965 -162.433,61.965 -224.392,-0l-149.865,-149.859c-61.861,-61.861 -61.978,-162.12 -0.263,-224.127l1018.28,-1023.06l-1018.27,-1023.06c-61.715,-62.008 -61.595,-162.269 0.266,-224.13l149.856,-149.856c61.965,-61.969 162.43,-61.969 224.392,-0l1284.85,1284.85c61.966,61.96 61.966,162.425 -0,224.393Zm2525.62,1210.05l0,-211.562c0,-87.63 -71.036,-158.669 -158.67,-158.669l-2009.82,-0c-87.634,-0 -158.67,71.039 -158.67,158.669l-0,211.562c-0,87.631 71.036,158.67 158.67,158.67l2009.82,-0c87.634,-0 158.67,-71.039 158.67,-158.67Z"/></svg>
            </a>
          </div>

          <Theme></Theme>

          <div className="hidden sm:block">
            <ContributePlaylist label="Share your playlist"></ContributePlaylist>
          </div>
        </div>
      </div>
    </nav>
  );
};
