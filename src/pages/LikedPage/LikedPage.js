import VideoCard from "../../components/VideoCard/VideoCard";
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth-context'
import { useLiked } from '../../context/like-context'
const LikedPage = () => {

    const { auth } = useAuth();
    const { likedVideo, clearLikedVideo } = useLiked();
    return (
        <div>
            <h1>Liked Video</h1>
            {auth.isLoggedIn ?
                <div>

                    {likedVideo && likedVideo.length > 0 && <button className="btn-clear" onClick={clearLikedVideo}>Clear wishlist</button>}
                    {
                        likedVideo.length > 0 ?
                            likedVideo.map(item => {
                                return (<VideoCard video={item} key={item._id} />)
                            })
                            :
                            <div>No liked videos</div>
                    }
                </div> : <div>
                    <h4>Please login first</h4>
                    <Link to="/signup">Signup</Link>
                </div>}
        </div>
    )
}

export default LikedPage