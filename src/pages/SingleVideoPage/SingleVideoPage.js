import { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useVideos } from '../../context/video-context'
const SingleVideoPage = () => {
    const params = useParams();
    const videoId = params.id || undefined;
    const { getVideoURL, videoToWatch } = useVideos();

    useEffect(() => {
        getVideoURL(videoId);
    }, [getVideoURL]);

    return (

        <div>
            {videoToWatch &&
                <div>
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoToWatch}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    >

                    </iframe>
                </div>
            }
        </div>
    )
}

export default SingleVideoPage