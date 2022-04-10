import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'

const WatchLaterContext = createContext(null);


const WatchLaterProvider = ({ children }) => {
    const { auth } = useAuth();
    const { isLoggedIn, token } = auth;
    const [watchLater, setWatchLater] = useState([]);

    const toggleWatchLater = (video) => {
        console.log("video", video);
        console.log("token", token);
        if (!isLoggedIn) {
            alert("Please login to add item to watch later");
            return;
        }
        if (watchLater.find((item) => item._id === video._id)) {
            removeFromWatchLater(video._id);
        }
        else {
            axios.post("/api/user/watchlater",
                { video },
                {
                    headers: { authorization: token },
                }
            )
                .then((res) => {
                    console.log(res);
                    setWatchLater(res.data.watchlater);
                })
                .catch((err) => {
                    alert("Oops you refreshed the page! Please logout and login again")
                });
        }

    };

    const removeFromWatchLater = (id) => {
        axios
            .delete(`/api/user/watchlater/${id}`, {
                headers: { authorization: token },
            })
            .then((res) => {
                setWatchLater(res.data.watchlater);
            })
            .catch((err) => {
                alert("some error occured while deleting")
            });
    };

    const clearWatchLater = () => {
        watchLater.map(video => removeFromWatchLater(video._id))
        setWatchLater([]);
    };

    const getWatchLater = () => {
        axios
            .get("/api/user/watchlater", {
                headers: { authorization: token },
            })
            .then((res) => {
                setWatchLater(res.data.watchlater);
            })
            .catch((err) => {
                setWatchLater([]);
            });
    }

    useEffect(() => {
        getWatchLater();
    }, []);


    return (
        <WatchLaterContext.Provider
            value={{
                watchLater,
                setWatchLater,
                toggleWatchLater,
                clearWatchLater,
                getWatchLater
            }}
        >
            {children}
        </WatchLaterContext.Provider>
    );
};
const useWatchLater = () => useContext(WatchLaterContext);
export { useWatchLater, WatchLaterProvider };