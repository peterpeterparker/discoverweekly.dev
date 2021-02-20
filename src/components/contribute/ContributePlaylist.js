import styles from './ContributePlaylist.module.scss';

import config from '../../config.json';

export const ContributePlaylist = ({label}) => {
  return (
    <a
      href={`${config.github}#contributing`}
      rel="noopener norefferer"
      aria-label={`${label}`}
      className={`${styles.button} border-white w-max border bg-purple-600 text-white capitalize rounded-full px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-purple-700 hover:border-purple-300`}>
      {label}
    </a>
  );
};
