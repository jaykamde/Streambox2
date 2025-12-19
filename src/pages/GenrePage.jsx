import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { MovieContext } from "../context/MovieContext";
import { FaHeart, FaClock, FaSearch } from "react-icons/fa";

/* ================= INLINE TRAILER MODAL ================= */
function TrailerModal({ title, onClose }) {
  if (!title) return null;

  const ytUrl = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(
    title + " official trailer"
  )}`;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[999] flex items-center justify-center"
      onMouseLeave={onClose}
    >
      <div className="relative w-[80%] h-[70%]">
        <iframe
          src={ytUrl}
          className="w-full h-full rounded-xl"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="Trailer Preview"
        />
      </div>
    </div>
  );
}

/* ================= GENRE PAGE ================= */
const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(false);
  const [previewTitle, setPreviewTitle] = useState(null);

  const { addToLiked, addToWatchLater } =
    useContext(MovieContext);

  const genreTitleMap = {
    action: "Avengers",
    comedy: "Friends",
    drama: "Breaking Bad",
    "sci-fi": "Interstellar",
    romance: "The Notebook",
  };

  const fetchGenreMovies = useCallback(
    async (query) => {
      try {
        setLoading(true);
        setSearched(true);

        const genreKeyword =
          genreTitleMap[genre?.toLowerCase()] || genre;

        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=16c5c67a&s=${
            query || genreKeyword
          }`
        );

        setMovies(res.data.Search || []);
      } catch (err) {
        console.error("Genre fetch error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [genre]
  );

  useEffect(() => {
    fetchGenreMovies();
  }, [fetchGenreMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) fetchGenreMovies(searchText);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/websitevideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 pt-24 px-6 pb-10 text-[#FAF0E6]">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="backdrop-blur-lg bg-white/10 border border-white/30 max-w-3xl mx-auto rounded-full flex items-center px-4 py-2 shadow-lg"
        >
          <input
            type="text"
            placeholder="Search within this genre..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent placeholder-[#B9B4C7] outline-none px-2"
          />
          <button
            type="submit"
            className="bg-[#B9B4C7]/70 hover:bg-[#FAF0E6]/80 text-[#352F44] font-semibold rounded-full px-4 py-1 flex items-center gap-2"
          >
            <FaSearch /> Search
          </button>
        </form>

        {/* Heading */}
        <h2 className="text-4xl font-bold mt-10 text-center capitalize">
          {searchText
            ? `Results for "${searchText}"`
            : `Genre: ${genre}`}
        </h2>

        {/* Loader */}
        {loading && (
          <div className="flex justify-center mt-16">
            <div className="w-14 h-14 border-4 border-[#B9B4C7] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Cards */}
        {!loading && movies.length > 0 && (
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.imdbID}
                className="relative rounded-xl overflow-hidden shadow-xl group hover:scale-[1.03] transition"
              >
                {/* actions */}
                <div className="absolute top-2 right-2 flex gap-2 z-10">
                  <button
                    onClick={() => addToLiked(movie)}
                    className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-full"
                  >
                    <FaHeart />
                  </button>
                  <button
                    onClick={() => addToWatchLater(movie)}
                    className="bg-black/60 hover:bg-blue-600 text-white p-2 rounded-full"
                  >
                    <FaClock />
                  </button>
                </div>

                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "/placeholder.png"
                  }
                  alt={movie.Title}
                  className="w-full h-72 object-cover cursor-pointer"
                  onMouseEnter={() =>
                    setPreviewTitle(movie.Title)
                  }
                  onMouseLeave={() =>
                    setPreviewTitle(null)
                  }
                  onClick={() =>
                    navigate(`/movie/${movie.imdbID}`)
                  }
                />

                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 via-transparent to-transparent p-3">
                  <h3 className="font-semibold text-sm truncate">
                    {movie.Title}
                  </h3>
                  <div className="text-xs text-white/70 mt-1">
                    📅 {movie.Year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎬 Hover Trailer Preview */}
      {previewTitle && (
        <TrailerModal
          title={previewTitle}
          onClose={() => setPreviewTitle(null)}
        />
      )}
    </div>
  );
};

export default GenrePage;
