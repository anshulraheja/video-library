import './Homepage.css';
import { useState } from 'react'
import { useVideos } from "../../context/video-context.js";
import VideoCard from '../../components/VideoCard/VideoCard';
import { useCategory } from '../../context/category-context';
const Homepage = () => {
    const { videos } = useVideos();
    const { categories } = useCategory();
    const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <div>
            <button name="All" onClick={(e) => setSelectedCategory(e.target.name)}>All</button>
            {categories && categories.map((category) => {
                return (
                    <button key={category._id} name={category.categoryName}
                        onClick={(e) => setSelectedCategory(e.target.name)} >
                        {category.categoryName}
                    </button>
                )
            })}
            {
                selectedCategory === "All" ?
                    videos.map((video, index) => {
                        return (
                            <VideoCard video={video} key={index} />
                        )
                    })
                    :
                    videos.length > 0 &&
                        videos.filter(video => video.category === selectedCategory).length > 0 ?
                        videos.filter(video => video.category === selectedCategory)
                            .map((video, index) => {
                                return (
                                    <VideoCard video={video} key={index} />
                                )
                            })
                        :
                        <div>No video available</div>
            }
        </div>
    )
}

export default Homepage