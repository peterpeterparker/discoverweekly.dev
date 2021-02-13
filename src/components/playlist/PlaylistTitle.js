import styles from './PlaylistTitle.module.scss';

import {formatDate} from "../../utils/date.utils";

export const PlaylistTitle = ({frontmatter}) => {
    const {name, tags, date} = frontmatter;

    return (
        <section className="max-w-screen-md m-auto px-5 pt-16">
            <h1 className={`${styles.title} font-bold text-6xl lg:text-8xl my-2 sm:my-4`}>{name} Playlist</h1>
            <p className="text-gray-600 dark:text-gray-300">{formatDate(date)}</p>
            {tags ? <p className="text-gray-600 dark:text-gray-300">{tags}</p> : undefined}
        </section>
    );
}
