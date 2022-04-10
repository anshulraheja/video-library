import { usePlaylist } from '../../context/playlist-context';

const PlaylistPage = (props) => {

    const { playlist } = usePlaylist();
    console.log(playlist);
    return (
        <div>PlaylistPage</div>
    )
}

export default PlaylistPage