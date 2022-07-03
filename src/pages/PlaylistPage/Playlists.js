import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PlaylistModal from "../../components/PlaylistModal/PlaylistModal";
import { usePlaylists } from "../../context/playlist-context";
import { useAuth } from "../../context/auth-context";
import './Playlists.css';
const Playlists = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const { playlists, removeFromPlaylists } = usePlaylists();
    const { auth: { isLoggedIn } } = useAuth();
    return (
        <main>
            <div className="main-feature-p main-feat-new">
                <div className="main-playlist-top">
                    <p className="main-heading">My Playlists</p>

                </div>

                {isLoggedIn ?
                    <div>
                        <button
                            className="create-playlist-button"
                            onClick={() => setShow((p) => !p)}
                        >
                            Create New Playlist
                        </button>
                        <ul className="main-prod-container">
                            {playlists.map((playlist) => (
                                <li key={playlist._id} className=" playlist-main">
                                    <div
                                        className="playlist-info-card"
                                        title="Go To Playlist"
                                        onClick={() => navigate(`/playlists/${playlist._id}`)}
                                    >
                                        <div className="playlist-name">{playlist.title}</div>
                                        <div className="playlist-count">
                                            {playlist.videos.length} Videos
                                        </div>
                                    </div>
                                    <button
                                        className="playlist-delete-btn"
                                        title="Delete This Playlist"
                                        onClick={() => removeFromPlaylists(playlist._id)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>
                        <p>No playlist</p>
                        <Link to="/signup">Signup</Link>
                    </div>}

            </div>
            {show && <PlaylistModal setShow={setShow} />}
        </main>
    )
}

export default Playlists