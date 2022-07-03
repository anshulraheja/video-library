import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import SideBar from './components/SideBar/SideBar'
import SignupPage from './pages/AuthPage/SignupPage'
import LoginPage from './pages/AuthPage/LoginPage'
import Homepage from './pages/Homepage/Homepage'
import PlaylistPage from './pages/PlaylistPage/PlaylistPage'
import LikedPage from './pages/LikedPage/LikedPage'
import WatchLaterPage from './pages/WatchLaterPage/WatchLaterPage'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import SingleVideoPage from './pages/SingleVideoPage/SingleVideoPage.js'
import Playlists from './pages/PlaylistPage/Playlists.js'
import Mockman from 'mockman-js'
const App = () => {
  return (
    <div className="main-container">
      <Header />
      <div className="product-page-content">
        <SideBar />
        <div className="product-container">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="//playlists/:playlistId" element={<PlaylistPage />} />
            <Route path="/liked" element={<LikedPage />} />
            <Route path="/watch-later" element={<WatchLaterPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/watch/:id" element={<SingleVideoPage />} />
            <Route path="mockman" element={<Mockman />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App