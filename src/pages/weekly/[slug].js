import {getAllPlaylistsGrouped, getWeeklyPlaylists} from '../../lib/playlist';

const WeeklyPage = ({weekly, playlists}) => {

  return <div>
    hello {weekly}
  </div>
}

export default WeeklyPage;

export async function getStaticProps({params}) {
  const playlists = await getWeeklyPlaylists(params);

  return {
    props: playlists,
  };
}

export async function getStaticPaths() {
  const playlists = await getAllPlaylistsGrouped();

  console.log('1', playlists);

  return {
    paths: Object.keys(playlists).map((key) => {
      return {
        params: {
          slug: `playlists-${playlists[key].weekly}`,
        },
      };
    }),
    fallback: false,
  };
}
