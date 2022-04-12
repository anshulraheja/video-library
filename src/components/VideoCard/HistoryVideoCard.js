import './VideoCard.css'
import { Link } from 'react-router-dom'
import { useHistory } from '../../context/history-context'
const HistoryVideoCard = ({ video }) => {

    const { toggleHistoryVideo } = useHistory();

    return (
        <div className="video-card-container">
            <Link to={`/watch/${video._id}`}>
                <div>
                    <img src={video.thumbNail} alt={video.title} />
                </div>
            </Link>
            <h3>{video.title}</h3>
            <div className="video-card-btn-container">

                <button onClick={() => toggleHistoryVideo(video)}>Remove from history</button>
            </div>
        </div>
    )
}

export default HistoryVideoCard