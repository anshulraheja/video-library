import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'
import axios from 'axios'

const PlaylistsContext = createContext();

const usePlaylists = () => useContext(PlaylistsContext);

function PlaylistsProvider({ children }) {
    const [playlists, setPlaylists] = useState([]);
    const [playlist, setPlaylist] = useState();
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
    }


    const addToPlaylists = async (playlist, video = null) => {
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

                if (video !== null) {
                    setTimeout(() => {
                        addToPlaylist(response.data.playlists.slice(-1)[0]._id, video);
                    }, 50);
                }
                setPlaylists(response.data.playlists);
            }
        } catch (error) {
            console.error(error.response.data.errors);
        }
    };

    const removeFromPlaylists = async (playlistId) => {
        try {
            const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.status === 200) {
                setPlaylists(response.data.playlists);

            }
        } catch (error) {
            console.error(error.response.data.errors);
        }
    };

    const getPlaylist = async (playlistId) => {
        try {
            const response = await axios.get(`/api/user/playlists/${playlistId}`, {
                headers: {
                    authorization: token,
                },
            });
            if (response.status === 200) {
                setPlaylist(response.data.playlist);

            }
        } catch (error) {
            console.error(error.response.data.errors);
        }
    };

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

            }
        } catch (error) {
            console.error(error.response.data.errors);
        }
    };

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

            }
        } catch (error) {
            console.error(error.response.data.errors);
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

