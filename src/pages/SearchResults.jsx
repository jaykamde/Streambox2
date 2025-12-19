import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const devFallback = (i) =>
  `https://picsum.photos/seed/search${i}/400/600`;

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q") || "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    const fetchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=16c5c67a&s=${encodeURIComponent(
            query
          )}&type=movie&page=1`
        );

        if (res.data && res.data.Search) {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        console.error("Search API error:", err);
        setMovies([]);
      } finally {
        if (mounted.current) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      mounted.current = false;
    };
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-28 px-6 lg:px-14 pb-20">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold">
          Search results for{" "}
          <span className="text-red-500">"{query}"</span>
        </h2>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center mt-20">
          <div className="w-14 h-14 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* NO RESULTS */}
      {!loading && movies.length === 0 && (
        <div className="text-white/60 mt-20 text-center">
          No movies found. Try another search.
        </div>
      )}

      {/* RESULTS GRID */}
      {!loading && movies.length > 0 && (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((m, i) => (
            <div
              key={m.imdbID || i}
              onClick={() => navigate(`/movie/${m.imdbID}`)}
              className="
                cursor-pointer
                rounded-xl overflow-hidden
                bg-[#1c1c1c]
                border border-red-500/20
                shadow-md
                transform transition-all duration-300
                hover:scale-105 hover:border-red-500/60
                hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]
              "
            >
              <img
                src={
                  m.Poster && m.Poster !== "N/A"
                    ? m.Poster
                    : devFallback(i)
                }
                alt={m.Title}
                className="w-full h-[320px] object-cover"
                loading="lazy"
              />

              {/* FRONT OVERLAY */}
              <div className="p-3 bg-black/80">
                <h3 className="font-semibold text-sm truncate">
                  {m.Title}
                </h3>
                <p className="text-xs text-white/60">
                  {m.Year || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
