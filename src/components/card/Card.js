import Link from 'next/link';

import styles from './Card.module.scss';

import {Profile} from "../profile/Profile";

export const Card = ({playlist}) => {
  const {slug, frontmatter, summary} = playlist;
  const {title, text} = summary;

  return (
    <article className="flex items-center p-5">
      <div className="w-full md:max-w-4xl md:px-8 md:py-4 mx-auto flex flex-col md:flex-row">
        {renderProfile()}

        {renderPost()}
      </div>
    </article>
  );

  function renderProfile() {
    return (
      <div className="md:w-40 mx-8 my-4 md:m-8 flex flex md:flex-col md:justify-center items-center text-gray-200">
        <Profile frontmatter={frontmatter} infoCss="ml-4 md:ml-0 md:text-sm"></Profile>
      </div>
    );
  }

  function renderPost() {
    return (
      <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
        <div className={`w-full rounded bg-gray-900 border-gray-600 border shadow-xl text-gray-300 hover:text-purple-300 md:text-left rounded-2xl p-8 cursor-pointer ${styles.post}`}>
            <div className="w-full mb-5 flex justify-between items-center">
                <div className="font-bold capitalize text-2xl text-gray-100" dangerouslySetInnerHTML={{ __html: title }}></div>

                <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-300 text-gray-100 transition duration-500 rounded-full px-2 py-1 text-sm">
                    Share
                </button>
            </div>

            <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }}></div>{' '}

            <p className="mt-4 block text-sm underline">
                More...
            </p>
        </div>
      </Link>
    );
  }
};
