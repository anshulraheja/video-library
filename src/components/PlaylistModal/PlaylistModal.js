import React, { useState, useEffect } from 'react'
import './PlaylistModal.css'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { usePlaylists } from '../../context/playlist-context';
import VideoCard from '../VideoCard/VideoCard'
import { useAuth } from '../../context/auth-context';
const PlaylistModal = (props) => {

    const { setShow, video } = props
    const [showDiv, setShowDiv] = useState(false);
    const [playlistItem, setPlaylistItem] = useState({ title: "" });
    const { playlists, addToPlaylists, removeFromPlaylist, addToPlaylist } =
        usePlaylists();
    const [playlistArr, setPlaylistArr] = useState([]);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { auth: { isLoggedIn } } = useAuth();
    useEffect(() => {
        setPlaylistArr(
            playlists.reduce(
                (acc, cur) =>
                    cur.videos.some((v) => v._id === video._id)
                        ? [...acc, cur]
                        : [...acc],
                []
            )
        );
    }, [playlists, video]);

    return (
        isLoggedIn ?
            <div className="modal-main">
                <div className="modal-content">
                    <button className="card-dismiss" onClick={() => setShow(p => !p)}>X</button>
                    <div className="modal-title">My Playlist</div>
                    <div className={`modal-playlist-container ${playlists.length === 0 ? "playlist-container-hide" : ""
                        }`}>
                        <ul className='modal-playilst-wrapper'>
                            {playlists.map((item) => (
                                <li key={item._id} className="playlist-item">
                                    <input
                                        type="checkbox"
                                        maxLength="20"
                                        className="item-checkbox"
                                        checked={playlistArr.some((p) => p._id === item._id)}
                                        onChange={playlistArr.some((p) => p._id === item._id) ? () => {
                                            removeFromPlaylist(item._id, video._id);
                                        }

                                            : () => {
                                                addToPlaylist(item._id, video);
                                            }
                                        } />
                                    <span onClick={() => navigate(`/playlists/${item._id}`)}>
                                        {item.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={`playlist-input-container ${showDiv ? "" : "input-box-hide"
                        }`}>
                        <input
                            ref={(input) => {
                                input && input.focus();
                            }}
                            type="text"
                            className="input-basic"
                            placeholder="Enter Name"
                            maxLength="15"
                            value={playlistItem.title}
                            onChange={(e) =>
                                setPlaylistItem((prev) => {
                                    return { ...prev, title: e.target.value };
                                })
                            }
                        />
                        <button
                            className="btn-create-playlist-btn"
                            disabled={playlistItem.title === "" ? true : false}
                            onClick={() => {
                                addToPlaylists(playlistItem, video);
                                setShow((p) => !p);
                                setShowDiv((p) => !p);
                                setPlaylistItem((prev) => {
                                    return { ...prev, title: "" };
                                });
                            }}
                        >
                            Create Playlist
                        </button>
                    </div >
                    <div className="create-playlist-btn-container">
                        <button
                            className={`btn-create-playlist-btn ${showDiv ? "input-box-hide" : ""
                                }`}

                            title="Create New Playlist"
                            onClick={() => setShowDiv((p) => !p)}
                        >
                            Create New Playlist
                        </button>
                    </div>
                </div>
            </div>
            :
            navigate(`/login`)
    )
}

export default PlaylistModal