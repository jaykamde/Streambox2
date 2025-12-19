import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MagnifyingGlassIcon,
  BellIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import MovieCard from "../components/MovieCard";

/* ================= NAVBAR ================= */
function TopNavbar() {
  const navigate = useNavigate();
  const path = window.location.pathname;

  // search
  const [openSearch, setOpenSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  // profile (only for initial letter)
  const [profile, setProfile] = useState({ name: "" });

  useEffect(() => {
    const saved = localStorage.getItem("userProfile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const linkClass = (p) =>
    `cursor-pointer transition ${
      path === p
        ? "text-white font-semibold"
        : "text-white/70 hover:text-white"
    }`;

  // focus search
  useEffect(() => {
    if (openSearch) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [openSearch]);

  // ESC close search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpenSearch(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${query}`);
    setQuery("");
    setOpenSearch(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f]/90 backdrop-blur">
      <div className="flex items-center justify-between px-10 py-4">
        {/* LEFT */}
        <div className="flex items-center gap-10">
          <span
            onClick={() => navigate("/")}
            className="text-red-600 font-extrabold text-2xl cursor-pointer"
          >
            StreamBox
          </span>

          <nav className="hidden md:flex gap-6 text-sm">
            <span onClick={() => navigate("/")} className={linkClass("/")}>Home</span>
            <span onClick={() => navigate("/movies")} className={linkClass("/movies")}>Movies</span>
            <span onClick={() => navigate("/series")} className={linkClass("/series")}>Series</span>
            <span onClick={() => navigate("/trending")} className={linkClass("/trending")}>Trending</span>
            <span onClick={() => navigate("/liked")} className={linkClass("/liked")}>❤️ Liked</span>
            <span onClick={() => navigate("/watchlater")} className={linkClass("/watchlater")}>⏱ Watch Later</span>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 text-white">
          {/* SEARCH */}
          <form onSubmit={handleSearch}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies..."
              className={`
                bg-black/70 text-sm text-white
                px-3 py-1.5 rounded-md outline-none
                border border-white/20
                transition-all duration-300
                ${openSearch ? "w-56 opacity-100 mr-2" : "w-0 opacity-0 px-0 mr-0 border-none"}
              `}
            />
          </form>

          <MagnifyingGlassIcon
            onClick={() => setOpenSearch((v) => !v)}
            className="w-5 h-5 cursor-pointer hover:text-red-500"
          />

          {/* 🔔 BELL → TRENDING */}
          <BellIcon
            onClick={() => navigate("/trending")}
            className="w-5 h-5 cursor-pointer hover:text-red-500"
          />

          {/* 🔴 PROFILE → PROFILE PAGE */}
          <div
            onClick={() => navigate("/profile")}
            className="w-8 h-8 bg-red-500 rounded-full cursor-pointer flex items-center justify-center font-bold"
            title="Profile"
          >
            {profile.name ? profile.name[0].toUpperCase() : "U"}
          </div>
        </div>
      </div>
    </header>
  );
}

/* ================= HERO ================= */
function Hero({ movies }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!movies.length) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % movies.length);
    }, 5000);
    return () => clearInterval(t);
  }, [movies]);

  if (!movies.length) {
    return (
      <div className="h-[60vh] flex items-center justify-center text-white/50">
        Loading content...
      </div>
    );
  }

  const m = movies[index];

  return (
    <section className="pt-24 px-6">
      <div
        className="relative w-[95%] mx-auto h-[75vh] rounded-3xl overflow-hidden border border-red-500/40 shadow-[0_0_40px_rgba(239,68,68,0.35)]"
        style={{
          backgroundImage: `url(${m.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

        <div className="relative z-10 h-full flex items-end px-16 pb-20 max-w-3xl">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">{m.title}</h1>
            <p className="text-white/70 text-lg">Release Year: {m.year}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= ROW ================= */
function Row({ title, movies }) {
  const rowRef = useRef(null);

  const scroll = (dir) => {
    rowRef.current?.scrollBy({
      left: dir === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative px-10 mt-20 overflow-visible">
      <h3 className="text-xl font-semibold mb-6">{title}</h3>

      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-red-600 p-2 rounded-full hidden md:flex"
      >
        <ChevronLeftIcon className="w-6 h-6 text-white" />
      </button>

      <div
        ref={rowRef}
        className="flex gap-6 overflow-x-scroll overflow-y-visible no-scrollbar pt-4 pb-16"
      >
        {movies.map((m) => (
          <div key={m.id} className="w-[260px] flex-shrink-0">
            <MovieCard
              movie={{
                imdbID: m.id,
                Title: m.title,
                Poster: m.image,
                Year: m.year,
              }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-red-600 p-2 rounded-full hidden md:flex"
      >
        <ChevronRightIcon className="w-6 h-6 text-white" />
      </button>
    </section>
  );
}

/* ================= HOME ================= */
export default function Home() {
  const [heroMovies, setHeroMovies] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const OMDB_KEY = "16c5c67a";
    const seeds = ["movie", "action", "drama", "thriller", "series"];

    Promise.all(
      seeds.map((s) =>
        axios.get(
          `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${s}&type=movie&page=1`
        )
      )
    ).then((res) => {
      const pool = [];
      const seen = new Set();

      res.forEach((r) =>
        r.data.Search?.forEach((m) => {
          if (m.Poster !== "N/A" && !seen.has(m.imdbID)) {
            seen.add(m.imdbID);
            pool.push({
              id: m.imdbID,
              title: m.Title,
              year: m.Year,
              image: m.Poster,
            });
          }
        })
      );

      const shuffled = pool.sort(() => 0.5 - Math.random());

      setHeroMovies(shuffled.slice(0, 5));
      setRows([
        { title: "Trending Movies", data: shuffled.slice(5, 20) },
        { title: "Popular Picks", data: shuffled.slice(20, 35) },
        { title: "Action & Thriller", data: shuffled.slice(35, 55) },
      ]);
    });
  }, []);

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white">
      <TopNavbar />
      <Hero movies={heroMovies} />
      {rows.map((r) => (
        <Row key={r.title} title={r.title} movies={r.data} />
      ))}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
