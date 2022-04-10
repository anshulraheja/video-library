import axios from "axios";
import React, {
    useEffect,
    useState,
    createContext,
    useContext,
} from "react";

const VideosContext = createContext();

const VideosProvider = ({ children }) => {
    const [videos, setVideos] = useState([]);
    const [videoToWatch, setVideoToWatch] = useState();

    async function getVideoURL(videoId) {
        try {
            const res = await axios.get(`/api/video/${videoId}`);
            const videoUrl = res.data.video.videoURL.split("=")[1];
            setVideoToWatch(videoUrl);
        } catch (err) {
            alert(err);

        }
    }

    useEffect(() => {
        const getVideos = async () => {
            try {
                const res = await axios.get("/api/videos");
                setVideos(res.data.videos)
            } catch (err) {
                alert(err);
            }
        };
        getVideos();
    }, [])


    return (
        <VideosContext.Provider
            value={{
                videos,
                getVideoURL,
                videoToWatch
            }}
        >
            {children}
        </VideosContext.Provider>
    );
};

const useVideos = () => useContext(VideosContext);
export { useVideos, VideosProvider };
