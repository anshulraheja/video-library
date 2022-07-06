import './VideoCard.css'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLiked } from '../../context/like-context'
import { useWatchLater } from '../../context/watchlater-context'
import { useHistory } from '../../context/history-context'
import PlaylistModal from '../PlaylistModal/PlaylistModal'
import { usePlaylists } from '../../context/playlist-context'
const VideoCard = (props) => {
    const { video } = props;
    const { pathname } = useLocation();
    const { likedVideo, toggleLikedVideo } = useLiked();
    const { watchLater, toggleWatchLater } = useWatchLater();
    const { toggleHistoryVideo } = useHistory();
    const [show, setShow] = useState(false);
    const { playlist, removeFromPlaylist } = usePlaylists();
    const isPlaylistPage = pathname.includes("playlists");
    const isVideoInlikedVideo =
        likedVideo.findIndex((p) => p._id === video._id) !== -1;

    const isVideoInWatchLater =
        watchLater.findIndex((p) => p._id === video._id) !== -1;


    return (
        <div className="video-card-container">
            {isPlaylistPage && <i className="fas fa-trash btn-delete"
                onClick={() => removeFromPlaylist(playlist._id, video._id)}>
            </i>}

            <Link to={`/watch/${video._id}`} onClick={() => toggleHistoryVideo(video)}   >

                <div className="video-img-container">

                    <img src={video.thumbNail} alt={video.title} />
                </div>
            </Link>
            <div>
                <h3>{video.title}</h3>
                <div className="video-card-btn-container">
                    {
                        isVideoInlikedVideo ?
                            <button onClick={() => toggleLikedVideo(video)}>Remove from Liked</button>
                            :
                            <button onClick={() => toggleLikedVideo(video)}>Like</button>
                    }
                    {
                        isVideoInWatchLater ?
                            <button onClick={() => toggleWatchLater(video)}> Remove from Watch Later</button>
                            :
                            <button onClick={() => toggleWatchLater(video)}>Watch Later</button>
                    }
                    <button onClick={() => setShow((p) => !p)}>Save to playlist</button>
                </div>
            </div>

            {show && <PlaylistModal setShow={setShow} video={video} />}
        </div>
    )
}

export default VideoCard