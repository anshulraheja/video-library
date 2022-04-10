import React, { useState } from 'react'
import './PlaylistModal.css'
import { usePlaylist } from '../../context/playlist-context';
import VideoCard from '../VideoCard/VideoCard'
const PlaylistModal = (props) => {

    const { playlist, createPlaylist, savetoPlaylist } = usePlaylist();
    const { setIsPlaylistModalOpen, video } = props;
    const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState()
    return (
        <div className="modal">
            <div>
                {
                    playlist.length > 0 ?
                        playlist.map((item, index) => {
                            return (
                                <div key={index} onClick={() => savetoPlaylist(video)}>{playlist.name}</div>
                            )
                        })
                        :
                        <div>No playlist</div>
                }
            </div>
            {!isCreatePlaylist && <div>
                <button onClick={() => setIsCreatePlaylist(true)}>Create New Playlist</button>
            </div>}
            <div>
                <button onClick={() => setIsPlaylistModalOpen(false)}>Close</button>
            </div>
            {
                isCreatePlaylist &&
                <div>
                    <label htmlFor="name">Name</label>
                    <input name="name" type="text" value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} />
                    <button onClick={() => createPlaylist(newPlaylist, video)}>Create</button>
                </div>
            }
        </div>
    )
}

export default PlaylistModal