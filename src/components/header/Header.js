import Head from 'next/head';

const Header = () => {
  return (
    <Head>
      <base href="/" />

      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#004e64" />
      <meta name="msapplication-TileColor" content="#161B22" />
      <meta name="theme-color" content="#161B22" />

      <link rel="manifest" href="/site.webmanifest" />

      <link rel="alternate" type="application/rss+xml" href="/rss.xml"/>
    </Head>
  );
};

export default Header;
