import Head from 'next/head';

import config from '../../config.json';

export const HeaderMeta = () => {
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
    </Head>
  );
};
