import React from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import CinematicPage from "../components/CinematicPage";

const LikedMovies = () => {
  const navigate = useNavigate();
  const { likedMovies } = useMovieContext();

  return (
    <CinematicPage
      title="Liked Movies"
      icon="mdi:heart"
    >
      {likedMovies.length === 0 ? (
        <div className="flex flex-col items-center mt-32 text-white/60">
          No liked movies yet
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {likedMovies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
            />
          ))}
        </div>
      )}
    </CinematicPage>
  );
};

export default LikedMovies;
