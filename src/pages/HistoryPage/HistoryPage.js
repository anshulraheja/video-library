import { useHistory } from "../../context/history-context";
import { useAuth } from '../../context/auth-context';
import VideoCard from "../../components/VideoCard/VideoCard";
import { Link } from 'react-router-dom';
import HistoryVideoCard from "../../components/VideoCard/HistoryVideoCard";
const HistoryPage = () => {
    const { auth } = useAuth();
    const { historyVideo, clearHistoryVideo } = useHistory();
    console.log(historyVideo);

    return (
        <div>
            <h1>History</h1>
            {auth.isLoggedIn ?
                <div>

                    {historyVideo && historyVideo.length > 0 && <button className="btn-clear-wishlist" onClick={clearHistoryVideo}>Clear all histroy</button>}
                    {
                        historyVideo.length > 0 ?
                            historyVideo.map(item => {
                                console.log(item);
                                return (<HistoryVideoCard video={item} key={item._id} />)
                            })
                            :
                            <div>No videos in history</div>
                    }
                </div> : <div>
                    <h4>Please login first</h4>
                    <Link to="/signup">Signup</Link>
                </div>}
        </div>
    )
}

export default HistoryPage