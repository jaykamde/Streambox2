import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Trending from "./pages/Trending";
import GenrePage from "./pages/GenrePage";
import SearchResults from "./pages/SearchResults";
import MovieDetails from "./pages/MovieDetails";
import LikedMovies from "./pages/LikedMovies";
import WatchLater from "./pages/WatchLater";
import Profile from "./pages/Profile";

import Footer from "./components/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col">
      {/* ROUTES */}
      <div className="flex-grow">
        <Routes>
          {/* HOME */}
          <Route path="/" element={<Home />} />

          {/* MAIN CONTENT */}
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/genre/:genre" element={<GenrePage />} />

          {/* MOVIE */}
          <Route path="/movie/:id" element={<MovieDetails />} />

          {/* USER */}
          <Route path="/liked" element={<LikedMovies />} />
          <Route path="/watchlater" element={<WatchLater />} />

          {/* SEARCH */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </div>

      {/* FOOTER (EVERY PAGE) */}
      <Footer />

      {/* TOASTS */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

export default App;
