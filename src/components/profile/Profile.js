import Image from 'next/image';

import styles from './Profile.module.scss';

import {formatDate} from '../../utils/date.utils';

export const Profile = ({frontmatter, infoCss, standalone}) => {
  const {name, profile, twitter, date} = frontmatter;

  return (
    <>
      <div className={`rounded-full overflow-hidden ${styles.profile} ${standalone ? 'big' : ''}`}>
        <Image src={profile} alt={`${name} profile image`} layout="intrinsic" width={128} height={128} />
      </div>
      <div className={`flex flex-col md:text-center md:mt-3 ${infoCss}`}>
        {renderName()}

        {
          !standalone ? <p className="text-xs mt-0.5 text-gray-600 dark:text-gray-50">{formatDate(date)}</p> : undefined
        }
      </div>
    </>
  );

  function renderName() {
    return twitter ? (
      <a
        href={`https://twitter.com/${twitter}`}
        rel="noopener norefferer"
        aria-label={`${name} - @${twitter}`}
        className={`hover:text-purple-600 dark:hover:text-purple-300 ${standalone ? '' : `${styles.twitter} text-xs`} font-bold`}>
        by {name}
      </a>
    ) : (
      <span className={`font-bold ${standalone ? '' : 'text-xs'}`}>by {name}</span>
    );
  }
};
