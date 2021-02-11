import {useState, useEffect, useRef} from 'react';

import {Navbar} from "../nav/Navbar";

import styles from './Layout.module.scss';

export const Layout = () => {

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
    const scrolledSize = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollTrigger = scrolledSize > 16;

    if (scrolledRef.current !== scrollTrigger) {
      setScrolledState(scrollTrigger);
    }
  };

  return (
    <header className={`fixed top-0 w-full ${styles.header} ${scrolled ? styles.fix : ''}`}>
      <Navbar></Navbar>
    </header>
  );
};
