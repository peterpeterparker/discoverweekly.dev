import Image from 'next/image';

import styles from './Profile.module.scss';

import {formatDate} from '../../utils/date.utils';

export const Profile = ({frontmatter, infoCss, imageCss}) => {
  const {name, profile, twitter, date} = frontmatter;

  return (
    <>
      <div className={`rounded-full overflow-hidden ${styles.profile} ${imageCss ? imageCss : ''}`}>
        <Image src={profile} alt={`${name} profile image`} layout="intrinsic" width={128} height={128} />
      </div>
      <div className={`flex flex-col md:text-center md:mt-3 ${infoCss}`}>
        {renderName()}
        <p className="text-xs md:mt-1">{formatDate(date)}</p>
      </div>
    </>
  );

  function renderName() {
    return twitter ? (
      <a
        href="https://twitter.com/{twitter}"
        rel="noopener norefferer"
        aria-label={`${name} - @${twitter}`}
        className={`hover:text-purple-300 ${styles.twitter}`}>
        {name}
      </a>
    ) : (
      {name}
    );
  }
};
