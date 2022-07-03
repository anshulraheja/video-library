import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'

const PlaylistsContext = createContext();

const usePlaylists = () => useContext(PlaylistsContext);

function PlaylistsProvider({ children }) {
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState();
    // const { dispatch } = useToast();
    const { auth: { token } } = useAuth();

    useEffect(() => {
        if (token) {
            (async function () {
                try {
                    const playlistsResponse = await axios.get("/api/user/playlists", {
                        headers: {
                            authorization: token,
                        },
                    });

                    if (playlistsResponse.status === 200) {
                        setPlaylists(playlistsResponse.data.playlists);
                    }
                } catch (error) {
                    console.error(error.response.data.errors);
                }
            })();
        }

    }, [token, playlist]);


    const getAllPlaylist = async () => {
        console.log("getAllPlaylist")
        try {
            const playlistsResponse = await axios.get("/api/user/playlists", {
                headers: {
                    authorization: token,
                },
            });
            console.log("getAllPlaylist", playlistsResponse.data);
            if (playlistsResponse.status === 200) {
                setPlaylists(playlistsResponse.data.playlists);
            }
        } catch (error) {
            console.error(error.response.data.errors);
        }
    }

    /**
     *
     * addToPlaylists : This API call will create a new playlist
     */
    const addToPlaylists = async (playlist, video = null) => {
        console.log(token);
        console.log(playlist, video);
        try {
            const response = await axios.post(
                "/api/user/playlists",
                { playlist },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.status === 201) {
                // dispatch({
                //     type: "TOAST_SUCCESS",
                //     payload: "Added to Playlists",
                // });
                console.log("Added to Playlistssss", response.data);
                if (video !== null) {
                    setTimeout(() => {
                        addToPlaylist(response.data.playlists.slice(-1)[0]._id, video);
                    }, 50);
                }
                setPlaylists(response.data.playlists);
            }
        } catch (error) {
            console.error(error.response.data.errors);
            // dispatch({ type: "TOAST_ERROR", payload: error.response.data.errors });
        }
    };
    /**
     *
     * removeFromPlaylists : This API call will remove playlist from Playlists Array
     */
    const removeFromPlaylists = async (playlistId) => {
        try {
            const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.status === 200) {
                setPlaylists(response.data.playlists);
                console.log("Removed from Playlistssss", response.data);

                // dispatch({
                //     type: "TOAST_SUCCESS",
                //     payload: "Removed from Playlists",
                // });
            }
        } catch (error) {
            console.error(error.response.data.errors);
            // dispatch({ type: "TOAST_ERROR", payload: error.response.data.errors });
        }
    };

    const getPlaylist = async (playlistId) => {
        console.log("getPlaylist Id", playlistId);
        try {
            const response = await axios.get(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: token,
                },
            });
            console.log(response)
            if (response.status === 200) {
                setPlaylist(response.data.playlist);
                console.log("getPlaylist", response.data);

            }
        } catch (error) {
            console.error(error.response.data.errors);
            // dispatch({ type: "TOAST_ERROR", payload: error.response.data.errors });
        }
    };

    /**
     *
     * addToPlaylist : This API call will add video to the particular playlist using playlistId
     */
    const addToPlaylist = async (playlistId, item) => {
        try {
            const response = await axios.post(
                `/api/user/playlists/${playlistId}`,
                { video: item },
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            if (response.status === 200 || response.status === 201) {
                setPlaylist(response.data.playlist);
                console.log("Added to playlist", response.data);

                // dispatch({
                //     type: "TOAST_SUCCESS",
                //     payload: `Added to ${response.data.playlist.title}`,
                // });
            }
        } catch (error) {
            console.error(error.response.data.errors);
            // dispatch({ type: "TOAST_ERROR", payload: error.response.data.errors });
        }
    };
    /**
     *
     * removeFromPlaylist : This API call will remove video from particular playlist using playlistId
     */
    const removeFromPlaylist = async (playlistId, videoId) => {
        try {
            const response = await axios.delete(
                `/api/user/playlists/${playlistId}/${videoId}`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );

            if (response.status === 200) {
                setPlaylist(response.data.playlist);
                console.log("Removed from playlist", response.data);

                // dispatch({
                //     type: "TOAST_SUCCESS",
                //     payload: `Removed from ${response.data.playlist.title}`,
                // });
            }
        } catch (error) {
            console.error(error.response.data.errors);
            // dispatch({ type: "TOAST_ERROR", payload: error.response.data.errors });
        }
    };

    return (
        <PlaylistsContext.Provider
            value={{
                playlist,
                playlists,
                addToPlaylists,
                removeFromPlaylists,
                getPlaylist,
                addToPlaylist,
                removeFromPlaylist,
                getAllPlaylist
            }}
        >
            {children}
        </PlaylistsContext.Provider>
    );
}

export { PlaylistsProvider, usePlaylists };

// const PlaylistContext = createContext(null);


// const PlaylistProvider = ({ children }) => {
//     const { auth } = useAuth();
//     const { isLoggedIn, token } = auth;
//     const [playlist, setPlaylist] = useState([]);

//     const savetoPlaylist = (video, playlistId) => {
//         axios.post(`/api/user/playlists/${playlistId}`, { video }, {
//             headers: { authorization: token }
//         }).then(res => {
//             console.log(res);
//         })
//             .catch(err => {
//                 alert("error while creating the playlist")
//             })

//     }
//     const createPlaylist = (newPlaylist, video) => {
//         console.log("creating playlist", newPlaylist);
//         axios.post("/api/user/playlists", { newPlaylist }, {
//             headers: { authorization: token }
//         }).then(res => {
//             console.log(res);
//             setPlaylist(res.data.playlists);
//         })
//             .catch(err => {
//                 alert("error while creating the playlist")
//             })

//     }
//     const togglePlaylist = (video) => {
//         console.log("product", video);
//         console.log("token", token);

//         if (playlist.find((item) => item._id === video._id)) {
//             removeFromPlaylist(video._id);
//         }
//         else {
//             axios.post("/api/user/playlists",
//                 { video },
//                 {
//                     headers: { authorization: token },
//                 }
//             )
//                 .then((res) => {
//                     console.log(res);
//                     setPlaylist(res.data.playlist);
//                 })
//                 .catch((err) => {
//                     alert("Oops you refreshed the page! Please logout and login again")
//                 });
//         }

//     };

//     const removeFromPlaylist = (id) => {
//         axios
//             .delete(`/api/user/playlists/${id}`, {
//                 headers: { authorization: token },
//             })
//             .then((res) => {
//                 setPlaylist(res.data.playlist);
//             })
//             .catch((err) => {
//                 alert("some error occured while deleting")
//             });
//     };

//     const clearPlaylist = () => {
//         playlist.map(video => removeFromPlaylist(video._id))
//         setPlaylist([]);
//     };

//     const getPlaylist = () => {
//         axios
//             .get("/api/user/playlists", {
//                 headers: { authorization: token },
//             })
//             .then((res) => {
//                 console.log("getplaylist", res)
//                 setPlaylist(res.data.playlists);
//             })
//             .catch((err) => {
//                 setPlaylist([]);
//             });
//     }

//     useEffect(() => {
//         getPlaylist();
//     }, []);


//     return (
//         <PlaylistContext.Provider
//             value={{
//                 playlist,
//                 setPlaylist,
//                 savetoPlaylist,
//                 createPlaylist,
//                 togglePlaylist,
//                 clearPlaylist,
//                 getPlaylist
//             }}
//         >
//             {children}
//         </PlaylistContext.Provider>
//     );
// };
// const usePlaylist = () => useContext(PlaylistContext);
// export { usePlaylist, PlaylistProvider };


