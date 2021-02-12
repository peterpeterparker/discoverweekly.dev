import Link from 'next/link';
import Image from 'next/image';

import styles from './Card.module.scss';

export const Card = ({playlist}) => {
  const {slug, frontmatter, summary} = playlist;
  const {name, profile, twitter, date} = frontmatter;
  const {title, text} = summary;

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
      <div className="md:w-40 mx-8 my-4 md:m-8 flex flex md:flex-col md:justify-center items-center">
        <div className={`rounded-full overflow-hidden ${styles.profile}`}>
          <Image src={profile} alt={`${name} profile image`} layout="intrinsic" width={128} height={128} />
        </div>
        <div className="flex flex-col md:text-center md:text-sm ml-2 md:ml-0 md:mt-3 ">
            <a
                href="https://twitter.com/{twitter}"
                rel="noopener norefferer"
                aria-label={`${name} - @${twitter}`}
                className={`text-gray-200 hover:text-purple-300 ${styles.twitter}`}>
                {name}
            </a>
            <p className="text-xs text-gray-200 md:mt-1">{new Intl.DateTimeFormat('en-US', {
                year: "numeric",
                month: "short",
                day: "2-digit"
            }).format(new Date(date))}</p>
        </div>
      </div>
    );
  }

  function renderPost() {
    return (
      <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
        <div className={`w-full rounded bg-gray-900 border-gray-600 border shadow-xl text-gray-300 hover:text-purple-300 md:text-left rounded-2xl p-8 flex justify-start cursor-pointer ${styles.post}`}>
          <div className="md:w-5/6">
            <div className="font-bold capitalize text-2xl mb-5 text-gray-100" dangerouslySetInnerHTML={{ __html: title }}></div>
            <div className="text-sm" dangerouslySetInnerHTML={{ __html: text }}></div>{' '}
              <a href="#" className="mt-4 block text-sm">
                  More...
              </a>
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
