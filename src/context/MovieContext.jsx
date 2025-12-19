import React, { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";

export const MovieContext = createContext();
export const useMovieContext = () => useContext(MovieContext);

const MovieProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem("likedMovies")) || [];
  });

  const [watchLater, setWatchLater] = useState(() => {
    return JSON.parse(localStorage.getItem("watchLater")) || [];
  });

  useEffect(() => {
    localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
  }, [likedMovies]);

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  const addToLiked = (movie) => {
    if (likedMovies.some((m) => m.imdbID === movie.imdbID)) return;
    setLikedMovies((prev) => [...prev, movie]);
    toast.success("❤️ Added to Liked Movies");
  };

  const addToWatchLater = (movie) => {
    if (watchLater.some((m) => m.imdbID === movie.imdbID)) return;
    setWatchLater((prev) => [...prev, movie]);
    toast.info("⏱ Added to Watch Later");
  };

  return (
    <MovieContext.Provider
      value={{
        likedMovies,
        watchLater,
        addToLiked,
        addToWatchLater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
