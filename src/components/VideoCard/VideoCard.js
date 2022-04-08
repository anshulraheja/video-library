import './VideoCard.css'
import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({ video }) => {

    return (
        <div className="video-card-container">
            <Link to={`/`}>
                <div>
                    <img src={video.thumbNail} alt={video.title} />
                </div>
            </Link>
            <div>
                <h3>{video.title}</h3>
                <button>Like</button>
                <button>Watch Later</button>
                <button>Save to playlist</button>
            </div>
        </div>
    )
}

export default VideoCard