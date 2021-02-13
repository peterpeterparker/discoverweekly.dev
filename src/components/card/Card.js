import React, {memo} from 'react';

import styles from './Card.module.scss';

import Link from 'next/link';

import {Profile} from "../profile/Profile";
import {formatDate} from "../../utils/date.utils";

export const Card = memo(({playlist}) => {
  const {slug, frontmatter, summary} = playlist;
  const {title, text} = summary;

  return (
    <article className="flex items-center px-5 pt-5 pb-10">
      <div className="w-full md:max-w-4xl md:px-8 md:py-4 mx-auto flex flex-col md:flex-row">
        {renderProfile()}

        {renderPost()}
      </div>
    </article>
  );

  function renderProfile() {
    return (
      <div className="md:w-40 mx-8 my-4 md:m-8 flex flex md:flex-col md:justify-center items-center text-gray-600 dark:text-gray-200">
        <Profile frontmatter={frontmatter} infoCss="ml-4 md:ml-0 md:text-sm"></Profile>
      </div>
    );
  }

  function renderPost() {
    return (
      <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
        <div className={`${styles.card} w-full rounded bg-white dark:bg-gray-900 border-purple-600 border text-gray-600 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-purple-700 dark:hover:bg-opacity-20 md:text-left rounded-2xl p-8 cursor-pointer transition duration-300`}>
            <div className="w-full flex justify-between items-center">
                <div className="font-bold capitalize text-4xl dark:text-gray-50" dangerouslySetInnerHTML={{ __html: title }}></div>

                <button className={`${styles.share} bg-gray-50 dark:bg-gray-700 hover:bg-purple-700 hover:text-white hover:border-purple-300 dark:hover:bg-purple-700 dark:hover:text-white dark:hover:border-purple-700 border border-purple-600 dark:border-gray-600 text-black dark:text-gray-100 transition duration-300 rounded-full px-2 py-1 text-sm`}>
                    Share
                </button>
            </div>

            <p className="text-xs mt-0.5">{formatDate(frontmatter.date)}</p>

            <div className="text-sm mt-4" dangerouslySetInnerHTML={{ __html: text }}></div>{' '}

            <p className="mt-4 block text-sm underline">
                More...
            </p>
        </div>
      </Link>
    );
  }
});
