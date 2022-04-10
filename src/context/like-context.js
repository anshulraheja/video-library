import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'

const LikedContext = createContext(null);


const LikedProvider = ({ children }) => {
    const { auth } = useAuth();
    const { isLoggedIn, token } = auth;
    const [likedVideo, setLikedVideo] = useState([]);

    const toggleLikedVideo = (video) => {
        console.log("product", video);
        console.log("token", token);
        if (!isLoggedIn) {
            alert("Please login to add item to liked");
            return;
        }
        if (likedVideo.find((item) => item._id === video._id)) {
            removeFromLikedVideo(video._id);
        }
        else {
            axios.post("/api/user/likes",
                { video },
                {
                    headers: { authorization: token },
                }
            )
                .then((res) => {
                    console.log(res);
                    setLikedVideo(res.data.likes);
                })
                .catch((err) => {
                    alert("Oops you refreshed the page! Please logout and login again")
                });
        }

    };

    const removeFromLikedVideo = (id) => {
        axios
            .delete(`/api/user/likes/${id}`, {
                headers: { authorization: token },
            })
            .then((res) => {
                setLikedVideo(res.data.likes);
            })
            .catch((err) => {
                alert("some error occured while deleting")
            });
    };

    const clearLikedVideo = () => {
        likedVideo.map(product => removeFromLikedVideo(product._id))
        setLikedVideo([]);
    };

    const getLikedVideo = () => {
        axios
            .get("/api/user/likes", {
                headers: { authorization: token },
            })
            .then((res) => {
                setLikedVideo(res.data.likes);
            })
            .catch((err) => {
                setLikedVideo([]);
            });
    }

    useEffect(() => {
        getLikedVideo();
    }, []);


    return (
        <LikedContext.Provider
            value={{
                likedVideo,
                setLikedVideo,
                toggleLikedVideo,
                clearLikedVideo,
                getLikedVideo
            }}
        >
            {children}
        </LikedContext.Provider>
    );
};
const useLiked = () => useContext(LikedContext);
export { useLiked, LikedProvider };