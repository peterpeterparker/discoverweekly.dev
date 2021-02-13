import React, {useRef, useEffect} from 'react';

import config from '../../config.json';

import {defineCustomElements as webSocialShareElement} from 'web-social-share/dist/loader';
webSocialShareElement();

export const Share = () => {
  const shareRef = useRef();

  useEffect(() => {
    if (!shareRef || !shareRef.current) {
      return;
    }

    initShare();
  }, [shareRef]);

  const initShare = () => {
    const shareOptions = {
      displayNames: true,
      config: [
        {
          twitter: {
            socialShareText: `Checkout ${config.title} by ${config.twitterUsername} 🤟`,
            socialShareUrl: config.url,
            socialSharePopupWidth: 300,
            socialSharePopupHeight: 400,
          },
        },
        {
          linkedin: {
            socialShareUrl: config.url,
          },
        },
        {
          email: {
            socialShareBody: `Checkout ${config.title} ${config.url}`,
          },
        },
        {
          whatsapp: {
            socialShareUrl: config.url,
          },
        },
        {
          copy: {
            socialShareUrl: config.url,
          },
        },
        {
          hackernews: {
            socialShareUrl: config.url,
          },
        },
      ],
    };

    shareRef.current.share = shareOptions;
  };

  return (
    <web-social-share show={false} ref={shareRef}>
      <svg aria-label="Twitter" slot="twitter" style={{fill: '#00aced', width: '32px', display: 'block'}} viewBox="0 0 512 512">
        <path d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z" />
      </svg>
      <svg aria-label="LinkedIn" slot="linkedin" style={{fill: '#0077b5', width: '32px', display: 'block'}} viewBox="0 0 512 512">
        <path d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z" />
      </svg>
      <svg aria-label="Email" slot="email" viewBox="0 0 512 512" style={{color: '#7C3AED', width: '32px', display: 'block'}}>
        <rect
          x="48"
          y="96"
          width="416"
          height="320"
          rx="40"
          ry="40"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M112 160l144 112 144-112"
        />
      </svg>
      <svg aria-label="WhatsApp" slot="whatsapp" style={{fill: '#25D366', width: '32px', display: 'block'}} viewBox="0 0 512 512">
        <path
          d="M414.73 97.1A222.14 222.14 0 00256.94 32C134 32 33.92 131.58 33.87 254a220.61 220.61 0 0029.78 111L32 480l118.25-30.87a223.63 223.63 0 00106.6 27h.09c122.93 0 223-99.59 223.06-222A220.18 220.18 0 00414.73 97.1zM256.94 438.66h-.08a185.75 185.75 0 01-94.36-25.72l-6.77-4-70.17 18.32 18.73-68.09-4.41-7A183.46 183.46 0 0171.53 254c0-101.73 83.21-184.5 185.48-184.5a185 185 0 01185.33 184.64c-.04 101.74-83.21 184.52-185.4 184.52zm101.69-138.19c-5.57-2.78-33-16.2-38.08-18.05s-8.83-2.78-12.54 2.78-14.4 18-17.65 21.75-6.5 4.16-12.07 1.38-23.54-8.63-44.83-27.53c-16.57-14.71-27.75-32.87-31-38.42s-.35-8.56 2.44-11.32c2.51-2.49 5.57-6.48 8.36-9.72s3.72-5.56 5.57-9.26.93-6.94-.46-9.71-12.54-30.08-17.18-41.19c-4.53-10.82-9.12-9.35-12.54-9.52-3.25-.16-7-.2-10.69-.2a20.53 20.53 0 00-14.86 6.94c-5.11 5.56-19.51 19-19.51 46.28s20 53.68 22.76 57.38 39.3 59.73 95.21 83.76a323.11 323.11 0 0031.78 11.68c13.35 4.22 25.5 3.63 35.1 2.2 10.71-1.59 33-13.42 37.63-26.38s4.64-24.06 3.25-26.37-5.11-3.71-10.69-6.48z"
          fillRule="evenodd"
        />
      </svg>
      <svg aria-label="Copy" slot="copy" style={{width: '32px', display: 'block'}} viewBox="0 0 512 512">
        <rect
          x="128"
          y="128"
          width="336"
          height="336"
          rx="57"
          ry="57"
          fill="none"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
      <svg aria-label="Hackernews" slot="hackernews" style={{fill: '#ff6000', width: '32px', display: 'block'}} viewBox="0 0 512 512">
        <path d="M32 32v448h448V32zm249.67 250.83v84H235v-84l-77-140h55l46.32 97.54 44.33-97.54h52.73z" />
      </svg>
    </web-social-share>
  );
};
