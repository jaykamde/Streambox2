import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import { BackIcon } from "../components/Icons";

const tabs = ["overview", "more", "details"];

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=16c5c67a&i=${id}&plot=full`
        );
        setMovie(res.data);

        const genre = res.data.Genre?.split(",")[0];
        if (genre) {
          const sim = await axios.get(
            `https://www.omdbapi.com/?apikey=16c5c67a&s=${genre}`
          );
          setSimilar(sim.data.Search?.slice(0, 8) || []);
        }
      } catch (e) {
        console.error("Failed to fetch movie");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading || !movie) {
    return <div className="min-h-screen bg-black" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white pt-24 px-8 pb-20">

      {/* 🎥 VIDEO BACKGROUND (FIXED) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/movie-bg.mp4" type="video/mp4" />
      </video>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-10" />

      {/* CONTENT */}
      <div className="relative z-20">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-white/70 hover:text-white"
        >
          <BackIcon /> Back
        </button>

        {/* MAIN CARD */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-[300px_1fr] gap-10 bg-black/60 rounded-2xl p-8 border border-white/20">

       {/* POSTER COLUMN */}
<div className="relative w-[280px] flex-shrink-0">

  {/* STICKY POSTER */}
  <div className="sticky top-28">
    <div className="relative">
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full rounded-xl shadow-xl"
      />

      {/* ⭐ Rating */}
      {movie.imdbRating && (
        <div className="absolute top-3 right-3 bg-black/80 px-3 py-1 rounded-full text-sm">
          ⭐ {movie.imdbRating}
        </div>
      )}

      {/* ▶ PLAY TRAILER — LOCKED TO POSTER */}
      <button
        onClick={() =>
          window.open(
            `https://www.youtube.com/results?search_query=${encodeURIComponent(
              movie.Title + " official trailer"
            )}`,
            "_blank"
          )
        }
        className="
          absolute bottom-4 left-1/2 -translate-x-1/2
          bg-red-600 hover:bg-red-700
          px-6 py-2 rounded-full
          flex items-center gap-2
          text-white font-semibold
          shadow-xl
        "
      >
        ▶ Play Trailer
      </button>
    </div>
  </div>

</div>


          {/* CONTENT */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>

            <p className="text-white/70 mb-6">
              {movie.Year} • {movie.Runtime} • {movie.Rated}
            </p>

            {/* TABS */}
            <div className="flex gap-8 border-b border-white/20 mb-6">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`pb-2 text-sm ${
                    activeTab === t
                      ? "border-b-2 border-red-500 text-white"
                      : "text-white/60"
                  }`}
                >
                  {t === "overview"
                    ? "Overview"
                    : t === "more"
                    ? "More Like This"
                    : "Details"}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}
            {activeTab === "overview" && (
              <p className="text-white/90 leading-relaxed">
                {movie.Plot}
              </p>
            )}

            {activeTab === "more" && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {similar.map((m) => (
                  <div
                    key={m.imdbID}
                    onClick={() => navigate(`/movie/${m.imdbID}`)}
                    className="cursor-pointer hover:scale-105 transition"
                  >
                    <img
                      src={m.Poster}
                      alt={m.Title}
                      className="rounded-lg h-56 object-cover"
                    />
                    <p className="text-sm mt-2 truncate">
                      {m.Title}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "details" && (
              <ul className="space-y-2 text-sm text-white/80">
                <li>🎬 Director: {movie.Director}</li>
                <li>🌍 Language: {movie.Language}</li>
                <li>🏆 Awards: {movie.Awards}</li>
                <li>⭐ IMDb: {movie.imdbRating}</li>
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
