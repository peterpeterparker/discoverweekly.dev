import Link from 'next/link';
import Image from 'next/image';

export const Card = ({playlist}) => {

  const {slug, frontmatter} = playlist;
  const {name, profile, twitter} = frontmatter;

  return (
    <Link as={`/playlist/${slug}`} href="/playlist/[slug]">
      <article className="flex items-center p-5">
        <div className="w-full max-w-4xl rounded bg-gray-900 border-gray-600 border shadow-xl p-8 mx-auto text-gray-800 md:text-left rounded-2xl">
          <div className="md:flex items-start -mx-10">
            <div className="w-1/6 ml-8 mr-4 flex justify-center self-center">
              <div className="relative object-cover rounded-full overflow-hidden w-20 h-20">
                <Image src={profile} alt={`${name} profile image`} layout="intrinsic" width={128} height={128} />
              </div>
            </div>
            <div className="w-4/6">
              <p className="font-bold capitalize text-2xl mb-5 text-gray-100">{name}</p>
              <p className="text-sm text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing, elit. Eos, voluptatum dolorum! Laborum blanditiis consequatur,
                voluptates, sint enim fugiat saepe, dolor fugit, magnam explicabo eaque quas id quo porro dolorum facilis...{' '}
                <a
                    href="#"
                    className="opacity-50 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">
                  MORE <i className="mdi mdi-arrow-right"></i>
                </a>
              </p>
            </div>
            <div className="w-1/6 pr-10 flex justify-end">
              <button className="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-300 text-gray-100 transition duration-500 rounded-full px-2 py-1 m-1 text-sm">Share</button>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
