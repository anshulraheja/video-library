import VideoCard from "../../components/VideoCard/VideoCard";
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { useWatchLater } from '../../context/watchlater-context'

const WatchLaterPage = () => {
    const { auth } = useAuth();
    const { watchLater, clearWatchLater } = useWatchLater();
    console.log(watchLater);

    return (
        <div>
            <h1>Watch Later Video</h1>
            {auth.isLoggedIn ?
                <div>

                    {watchLater && watchLater.length > 0 && <button className="btn-clear-wishlist" onClick={clearWatchLater}>Clear watch later</button>}
                    {
                        watchLater.length > 0 ?
                            watchLater.map(item => {
                                console.log(item);
                                return (<VideoCard video={item} key={item._id} />)
                            })
                            :
                            <div>No watch later videos</div>
                    }
                </div> : <div>
                    <h4>Please login first</h4>
                    <Link to="/signup">Signup</Link>
                </div>}
        </div>
    )
}

export default WatchLaterPage