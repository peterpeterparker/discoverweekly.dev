import Head from 'next/head';

import config from '../../config.json';

const Header = () => {
  return (
    <Head>
      <title>{config.title}</title>

      <meta property="og:site_name" content={config.title} />
      <meta property="og:title" content={config.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={config.url} />
      <meta property="og:image" content={`${config.url}${config.image}`} />
      <meta property="og:image:type" content="image/png" />

      <meta name="twitter:site" content={config.twitterUsername} />
      <meta name="twitter:creator" content={config.twitterUsername} />
      <meta name="twitter:title" content={config.title} />
      <meta name="twitter:description" content={config.description} />
      <meta name="twitter:image:src" content={`${config.url}${config.image}`} />
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="author" content={config.author} />

      <meta name="description" content={config.description} />
      <meta property="og:description" content={config.description} />

      <link rel="canonical" href={config.url} />

      <base href="/" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#004e64" />
      <meta name="msapplication-TileColor" content="#af2bbf" />
      <meta name="theme-color" content="#af2bbf" />

      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
};

export default Header;
