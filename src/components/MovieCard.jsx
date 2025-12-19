import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const movieId = movie?.imdbID || movie?.id;
  if (!movieId) return null;

  return (
    <div
      onClick={() => navigate(`/movie/${movieId}`)}
      className="
        relative
        cursor-pointer
        transition-transform duration-300
        hover:scale-110 hover:z-30
      "
    >
      <div
        className="
          relative
          w-[260px] h-[390px]
          rounded-xl overflow-hidden
          bg-[#1c1c1c]
          border border-red-500/20
          shadow-md
          group
        "
      >
        {/* POSTER */}
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "/placeholder.png"
          }
          alt={movie.Title}
          className="
            w-full h-full object-cover
            transition duration-300
            group-hover:scale-105 group-hover:brightness-75
          "
        />

        {/* FRONT OVERLAY (ALWAYS INSIDE CARD) */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/90 via-black/40 to-transparent
            flex items-end
            p-4
          "
        >
          <div>
            <h3 className="text-white font-bold text-base leading-tight line-clamp-2">
              {movie.Title}
            </h3>
            <p className="text-sm text-white/70">
              📅 {movie.Year || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
