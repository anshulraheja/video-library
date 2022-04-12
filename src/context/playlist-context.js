import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'

const PlaylistContext = createContext(null);


const PlaylistProvider = ({ children }) => {
    const { auth } = useAuth();
    const { isLoggedIn, token } = auth;
    const [playlist, setPlaylist] = useState([]);

    const savetoPlaylist = (video, playlistId) => {
        axios.post(`/api/user/playlists/${playlistId}`, { video }, {
            headers: { authorization: token }
        }).then(res => {
            console.log(res);
        })
            .catch(err => {
                alert("error while creating the playlist")
            })

    }
    const createPlaylist = (newPlaylist, video) => {
        console.log("creating playlist", newPlaylist);
        axios.post("/api/user/playlists", { newPlaylist }, {
            headers: { authorization: token }
        }).then(res => {
            console.log(res);
            setPlaylist(res.data.playlists);
        })
            .catch(err => {
                alert("error while creating the playlist")
            })

    }
    const togglePlaylist = (video) => {
        console.log("product", video);
        console.log("token", token);

        if (playlist.find((item) => item._id === video._id)) {
            removeFromPlaylist(video._id);
        }
        else {
            axios.post("/api/user/playlists",
                { video },
                {
                    headers: { authorization: token },
                }
            )
                .then((res) => {
                    console.log(res);
                    setPlaylist(res.data.playlist);
                })
                .catch((err) => {
                    alert("Oops you refreshed the page! Please logout and login again")
                });
        }

    };

    const removeFromPlaylist = (id) => {
        axios
            .delete(`/api/user/playlists/${id}`, {
                headers: { authorization: token },
            })
            .then((res) => {
                setPlaylist(res.data.playlist);
            })
            .catch((err) => {
                alert("some error occured while deleting")
            });
    };

    const clearPlaylist = () => {
        playlist.map(video => removeFromPlaylist(video._id))
        setPlaylist([]);
    };

    const getPlaylist = () => {
        axios
            .get("/api/user/playlists", {
                headers: { authorization: token },
            })
            .then((res) => {
                console.log("getplaylist", res)
                setPlaylist(res.data.playlists);
            })
            .catch((err) => {
                setPlaylist([]);
            });
    }

    useEffect(() => {
        getPlaylist();
    }, []);


    return (
        <PlaylistContext.Provider
            value={{
                playlist,
                setPlaylist,
                savetoPlaylist,
                createPlaylist,
                togglePlaylist,
                clearPlaylist,
                getPlaylist
            }}
        >
            {children}
        </PlaylistContext.Provider>
    );
};
const usePlaylist = () => useContext(PlaylistContext);
export { usePlaylist, PlaylistProvider };


/* 
 1. onClick on save playlist
    1.1 open modal 
    1.2 show existing playlist
    1.3 modal should have create playlist button 

 2. onClick on existing playlist 
    2.1 save the video to that playlist
    2.2 if video already exists, show alert and return

 3. onClick of create (1)
    3.1 show modal to create playlist
    3.2 update the exsiting list when new playlist is added

    
 */
