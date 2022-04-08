import './SideBar.css'

import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
    return (
        <div className="filter-container">
            <Link to="/" >Home</Link>
            <Link to="/playlist" >Playlist</Link>
            <Link to="/liked" >Liked</Link>
            <Link to="/watch-later" >Watch Later</Link>
            <Link to="/history" >History</Link>
        </div>
    )
}

export default SideBar