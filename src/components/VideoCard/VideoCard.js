import './VideoCard.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLiked } from '../../context/like-context'
import { useWatchLater } from '../../context/watchlater-context'
import { useHistory } from '../../context/history-context'
import { usePlaylist } from '../../context/playlist-context';
import PlaylistModal from '../PlaylistModal/PlaylistModal'

const VideoCard = ({ video }) => {

    const { likedVideo, toggleLikedVideo } = useLiked();
    const { watchLater, toggleWatchLater } = useWatchLater();
    const { toggleHistoryVideo } = useHistory();
    const { playlist } = usePlaylist();

    const [isPlaylistModalOpen, setIsPlaylistModalOpen] = useState(false);

    const isVideoInlikedVideo =
        likedVideo.findIndex((p) => p._id === video._id) !== -1;

    const isVideoInWatchLater =
        watchLater.findIndex((p) => p._id === video._id) !== -1;

    return (
        <div className="video-card-container">
            <Link to={`/watch/${video._id}`} onClick={() => toggleHistoryVideo(video)}   >
                <div>
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
                    <button onClick={() => setIsPlaylistModalOpen(false)}>Save to playlist</button>
                </div>
            </div>

            {/* {isPlaylistModalOpen &&
                <PlaylistModal
                    setIsPlaylistModalOpen={setIsPlaylistModalOpen}
                    video={video}
                />
            } */}
        </div>
    )
}

export default VideoCard