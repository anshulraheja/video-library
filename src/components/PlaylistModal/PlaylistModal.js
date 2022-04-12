import React, { useState, useEffect } from 'react'
import './PlaylistModal.css'
import { usePlaylist } from '../../context/playlist-context';
import VideoCard from '../VideoCard/VideoCard'
const PlaylistModal = (props) => {

    const { playlist, createPlaylist, savetoPlaylist, getPlaylist } = usePlaylist();
    const { setIsPlaylistModalOpen, video } = props;
    const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({
        title: "",
        decription: ""
    })

    const inputHandler = (e) => {
        setNewPlaylist((data) => ({ ...data, [e.target.name]: e.target.value }));

    };
    useEffect(() => {
        getPlaylist();
    }, []);
    return (
        <div className="modal">
            <div>
                {
                    playlist.length > 0 ?
                        playlist.map((item, index) => {
                            return (
                                <div key={index} onClick={() => savetoPlaylist(video, item._id)}>{item._id}</div>
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
                    <label htmlFor="title">Title</label>
                    <input name="title" type="text" onChange={inputHandler} />
                    <label htmlFor="decription">decription</label>
                    <input name="decription" type="text" onChange={inputHandler} />
                    <button onClick={() => createPlaylist(newPlaylist, video)}>Create</button>
                </div>
            }
        </div>
    )
}

export default PlaylistModal