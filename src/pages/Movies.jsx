import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import { BackIcon } from "../components/Icons";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://www.omdbapi.com/?apikey=16c5c67a&s=movie")
      .then((res) => {
        setMovies(res.data.Search || []);
      });
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">
      {/* 🎥 VIDEO BG */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/movie-bg.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 pt-24 px-10 pb-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-white/80 hover:text-white"
        >
          <BackIcon /> Back
        </button>

        <h1 className="text-4xl font-extrabold mb-10">🎬 Movies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((m) => (
            <MovieCard
              key={m.imdbID}
              movie={{
                imdbID: m.imdbID,
                Title: m.Title,
                Poster: m.Poster,
                Year: m.Year,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
