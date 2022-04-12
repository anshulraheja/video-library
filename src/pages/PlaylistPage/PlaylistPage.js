import { usePlaylist } from '../../context/playlist-context';

const PlaylistPage = (props) => {

    const { playlist } = usePlaylist();
    console.log(playlist);
    return (
        <div>Playlist Page is under contructions</div>
    )
}

export default PlaylistPage