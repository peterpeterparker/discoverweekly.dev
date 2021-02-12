import Link from 'next/link';
import Image from 'next/image';

import styles from './Card.module.scss';

export const Card = ({playlist}) => {
  const {slug, frontmatter} = playlist;
  const {name, profile, twitter} = frontmatter;

  return (
    <article className="flex items-center p-5">
      <div className="w-full max-w-4xl p-8 mx-auto flex flex-col md:flex-row">
        {renderProfile()}

        {renderPost()}
      </div>
    </article>
  );

  function renderProfile() {
    return (
      <div className="md:w-1/6 mx-4 my-2 md:m-8 flex md:flex-col md:justify-center items-center">
        <div className={`rounded-full overflow-hidden ${styles.profile}`}>
          <Image src={profile} alt={`${name} profile image`} layout="intrinsic" width={128} height={128} />
        </div>
        <a
          href="https://twitter.com/{twitter}"
          rel="noopener norefferer"
          aria-label="@{twitter}"
          className={`text-gray-200 md:text-xs ml-2 md:ml-0 md:mt-3 text-center hover:text-purple-300 ${styles.twitter}`}>
          @{twitter}
        </a>
      </div>
    );
  }

  function renderPost() {
    return (
      <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
        <div className={`rounded bg-gray-900 border-gray-600 border shadow-xl text-gray-300 hover:text-purple-300 md:text-left rounded-2xl p-8 flex justify-start cursor-pointer ${styles.post}`}>
          <div className="md:w-5/6">
            <p className="font-bold capitalize text-2xl mb-5 text-gray-100">{name}</p>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur,
              voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis...{' '}
              <a href="#" className="opacity-50 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">
                MORE <i className="mdi mdi-arrow-right"></i>
              </a>
            </p>
          </div>
          <div className="w-1/6 flex justify-end items-start m-0">
            <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-300 text-gray-100 transition duration-500 rounded-full px-2 py-1 m-1 text-sm">
              Share
            </button>
          </div>
        </div>
      </Link>
    );
  }
};
