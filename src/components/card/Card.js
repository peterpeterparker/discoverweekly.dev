import React, {memo} from 'react';

import styles from './Card.module.scss';

import Link from 'next/link';

import {Profile} from '../profile/Profile';
import {SharePlaylist} from '../share/SharePlaylist';

export const Card = memo(({playlist}) => {
  const {slug, frontmatter, summary} = playlist;
  const {name, twitter, tags} = frontmatter;
  const {title, text, count} = summary;

  return (
    <article className="flex items-center px-5 pt-5 pb-10 md:pb-5">
      <div className="w-full md:max-w-4xl md:px-8 md:py-4 mx-auto flex flex-col-reverse md:flex-row">
        {renderProfile()}

        {renderPost()}
      </div>
    </article>
  );

  function renderProfile() {
    return (
      <div className="md:w-40 mx-8 my-4 md:m-8 flex flex md:flex-col md:justify-center items-center text-gray-600 dark:text-gray-50">
        <Profile frontmatter={frontmatter} slug={slug} infoCss="ml-4 md:ml-0 md:text-sm"></Profile>
      </div>
    );
  }

  function renderPost() {
    return (
      <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
        <div
          className={`${styles.card} w-full rounded bg-white dark:bg-gray-900 border-purple-600 border text-gray-600 dark:text-gray-50 hover:bg-purple-100 dark:hover:bg-purple-700 dark:hover:bg-opacity-20 md:text-left rounded-2xl p-8 cursor-pointer transition duration-300`}>
          <div className="w-full flex justify-between items-center">
            <div className="inline-block">
              <span className="font-bold capitalize text-4xl dark:text-gray-50">{title}</span>
              {count > 1 ? <span className="text-md pl-2 text-gray-300 dark:text-gray-50">+{count - 1} tips</span> : undefined}
            </div>
          </div>
          {tags ? <p className="text-sm mt-0.5 'ext-gray-600 dark:text-gray-50">{tags}</p> : undefined}
          <div className="text-sm mt-4" dangerouslySetInnerHTML={{__html: text}}></div>{' '}
          <div className="flex justify-between">
            <p className="mt-4 block text-sm underline hover:text-purple-600 dark:hover:text-purple-300">More...</p>

            <SharePlaylist slug={slug} name={name} twitter={twitter}></SharePlaylist>
          </div>
        </div>
      </Link>
    );
  }
});
