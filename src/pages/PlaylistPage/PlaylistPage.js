
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import VideoCard from "../../components/VideoCard/VideoCard";
import { usePlaylists } from "../../context/playlist-context";
const PlaylistPage = (props) => {

    const { playlistId } = useParams();
    const [loading, setLoading] = useState(true);
    const { playlist, getPlaylist, removeFromPlaylists } = usePlaylists();
    const navigate = useNavigate();

    useEffect(() => {
        let timeout;
        (async function () {
            try {
                setLoading(true);
                await getPlaylist(playlistId);
                timeout = setTimeout(() => {
                    setLoading(false);
                }, 200);
            } catch (error) {
                console.error(error.response.data.errors);
            }
        })();
        return () => clearTimeout(timeout);
    }, [playlistId]);


    return (loading ?
        <div>Loading...</div> :
        <main className="main">
            <div className="main-feature-p main-feat-new">
                <div className="main-playlist-top">
                    <p className="main-heading">{playlist.title}'s Page</p>
                    <button
                        className="btn btn-primary btn-bolder create-playlist-button"
                        onClick={() => {
                            removeFromPlaylists(playlistId);
                            navigate("/playlists");
                        }}
                    >
                        Delete Playlist
                    </button>
                </div>
                <ul className="main-prod-container">
                    {playlist.videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default PlaylistPage