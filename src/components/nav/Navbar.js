import {useEffect, useRef, useState} from 'react';

import Image from 'next/image';

import config from '../../config.json';

import styles from './Navbar.module.scss';

import {PrimaryButton} from '../button/PrimaryButton';

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
    <nav className={`bg-black fixed top-0 w-full z-10 ${styles.nav} ${scrolled ? styles.fix : ''}`}>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <a href="/" className="flex-shrink-0 flex items-center sm:pl-2">
              <Image src="/images/logo.svg" alt={`${config.title} logo`} width={48} height={48} />
            </a>
          </div>
          <div className="absolute inset-y-0 right-0 items-center pr-2 hidden sm:flex">
            <PrimaryButton>Share your playlist</PrimaryButton>
          </div>
        </div>
      </div>
    </nav>
  );
};
