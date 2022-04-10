import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideosProvider } from "./context/video-context";
import { AuthProvider } from "./context/auth-context";
import { CategoryProvider } from "./context/category-context";
import { LikedProvider } from './context/like-context'
import { WatchLaterProvider } from './context/watchlater-context';
import { HistoryProvider } from './context/history-context';
import { PlaylistProvider } from './context/playlist-context';
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      <CategoryProvider>
        <VideosProvider>
          <AuthProvider>
            <PlaylistProvider>
              <HistoryProvider>
                <LikedProvider>
                  <WatchLaterProvider>
                    <App />
                  </WatchLaterProvider>
                </LikedProvider>
              </HistoryProvider>
            </PlaylistProvider>
          </AuthProvider>
        </VideosProvider>
      </CategoryProvider>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
