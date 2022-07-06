import { useState } from "react";
import { usePlaylists } from "../../context/playlist-context";
import "./PlaylistModal.css";
export function CreatePlaylistModal({ setShow }) {
    const { addToPlaylists } = usePlaylists();
    const [playlistItem, setPlaylistItem] = useState({ title: "" });

    return (
        <div className="modal-main">
            <div className="modal-content">
                <button
                    id="btn btn-primary"
                    className="card-dismiss"
                    title="Dismiss"
                    onClick={() => setShow((p) => !p)}
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="modal-title fw-700"> Create New Playlist</div>

                <div className="playlist-input-container">
                    <input
                        ref={(input) => {
                            input && input.focus();
                        }}
                        type="text"
                        className="input-basic"
                        name="playlist-name-input"
                        placeholder="Enter Name"
                        maxLength="15"
                        value={playlistItem.title}
                        onChange={(e) =>
                            setPlaylistItem((prev) => {
                                return { ...prev, title: e.target.value };
                            })
                        }
                    />
                    <div className="create-playlist-btn-container">
                        <button className="btn-create-playlist-btn"

                            disabled={playlistItem.title === "" ? true : false}
                            onClick={() => {
                                addToPlaylists(playlistItem);
                                setShow((p) => !p);
                                setPlaylistItem((prev) => {
                                    return { ...prev, title: "" };
                                });
                            }}
                        >
                            Create Playlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}