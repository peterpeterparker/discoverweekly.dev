import styles from './PlaylistsTitle.module.scss';

import {formatDate} from '../../utils/date.utils';

export const PlaylistsTitle = ({weekly}) => {
  return (
    <section className="max-w-screen-md m-auto px-5 pt-16">
      <h1 className={`${styles.title} font-bold text-6xl lg:text-8xl my-2 sm:my-4 capitalize`}>
        Playlists published on {formatDate(weekly)}
      </h1>
    </section>
  );
};
