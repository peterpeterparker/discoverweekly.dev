import {useEffect, useRef, useState} from "react";

import styles from './Navbar.module.scss';

import {PrimaryButton} from "../button/PrimaryButton";

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
        const scrolledSize = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const scrollTrigger = scrolledSize > 16;

        if (scrolledRef.current !== scrollTrigger) {
            setScrolledState(scrollTrigger);
        }
    };

    return (
        <nav className={`bg-gray-800 fixed top-0 w-full ${styles.nav} ${scrolled ? styles.fix : ''}`}>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="block sm:hidden h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                            <img
                                className="hidden sm:block h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                alt="Workflow"
                            />
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 items-center pr-2 hidden sm:flex">
                        <PrimaryButton>
                            Add your playlist
                        </PrimaryButton>
                    </div>
                </div>
            </div>

        </nav>
    );
};
