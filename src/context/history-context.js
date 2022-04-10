import { useContext, createContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context'
import axios from 'axios'



const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
    const { auth } = useAuth();
    const { isLoggedIn, token } = auth;
    const [historyVideo, setHistoryVideo] = useState([]);

    const toggleHistoryVideo = (video) => {
        console.log("product", video);
        console.log("token", token);
        if (!isLoggedIn) {
            alert("Please login to add item to history");
            return;
        }
        if (historyVideo.find((item) => item._id === video._id)) {
            removeFromHistoryVideo(video._id);
        }
        else {
            axios.post("/api/user/history",
                { video },
                {
                    headers: { authorization: token },
                }
            )
                .then((res) => {
                    console.log(res);
                    setHistoryVideo(res.data.history);
                })
                .catch((err) => {
                    alert("Oops you refreshed the page! Please logout and login again")
                });
        }

    };

    const removeFromHistoryVideo = (id) => {
        axios
            .delete(`/api/user/history/${id}`, {
                headers: { authorization: token },
            })
            .then((res) => {
                setHistoryVideo(res.data.history);
            })
            .catch((err) => {
                alert("some error occured while deleting")
            });
    };

    const clearHistoryVideo = () => {
        historyVideo.map(video => removeFromHistoryVideo(video._id))
        setHistoryVideo([]);
    };

    const getHistoryVideo = () => {
        axios
            .get("/api/user/history", {
                headers: { authorization: token },
            })
            .then((res) => {
                setHistoryVideo(res.data.history);
            })
            .catch((err) => {
                setHistoryVideo([]);
            });
    }

    useEffect(() => {
        getHistoryVideo();
    }, []);

    return (
        <HistoryContext.Provider value={{
            historyVideo,
            toggleHistoryVideo,
            clearHistoryVideo
        }}>
            {children}
        </HistoryContext.Provider>
    )
}

const useHistory = () => useContext(HistoryContext)

export { useHistory, HistoryProvider }