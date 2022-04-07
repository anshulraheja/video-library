import { Routes, Route } from 'react-router-dom'
import { Homepage, VideoPage, LikePage, WatchLaterPage, SignupPage, LoginPage } from './pages/index.js'
import Mockman from "mockman-js";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video/:id" element={<VideoPage />} />
        <Route path="/like" element={<LikePage />} />
        <Route path="/watchlater" element={<WatchLaterPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="mockman" element={<Mockman />} />
      </Routes>

    </div>
  );
}

export default App;
