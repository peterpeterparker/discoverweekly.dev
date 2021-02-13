import Head from 'next/head';

import config from '../../config.json';

export const HeaderMetaPlaylist = ({slug, frontmatter}) => {
    const {twitter, name} = frontmatter;

    const title = `${name} playlist on ${config.title}`;
    const url = `${config.url}/playlist/${slug}`;

    return (
        <Head>
            <title>{title}</title>

            <meta property="og:site_name" content={title} />
            <meta property="og:title" content={config.description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={`${config.url}${config.image}`} />
            <meta property="og:image:type" content="image/png" />

            <meta name="twitter:site" content={twitter} />
            <meta name="twitter:creator" content={twitter} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={config.description} />
            <meta name="twitter:image:src" content={`${config.url}${config.image}`} />
            <meta name="twitter:card" content="summary_large_image" />

            <meta name="author" content={name} />

            <meta name="description" content={config.description} />
            <meta property="og:description" content={config.description} />

            <link rel="canonical" href={url} />
        </Head>
    );
};
