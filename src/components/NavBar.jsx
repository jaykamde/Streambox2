import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showGenres, setShowGenres] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent text-[#FAF0E6] px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wider drop-shadow-lg">
        🎥 <span className="animate-color-cycle">MyFlix</span>
      </Link>

      <div className="flex gap-6 text-lg font-semibold relative drop-shadow-md">
        <Link to="/" className="hover:text-[#FAF0E6]/80 transition">Home</Link>
        <Link to="/liked" className="hover:text-[#FAF0E6]/80 transition">Liked</Link>
        <Link to="/watch-later" className="hover:text-[#FAF0E6]/80 transition">Watch Later</Link>

        {/* Genre Dropdown */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setShowGenres(true)}
          onMouseLeave={() => setShowGenres(false)}
        >
          <span className="hover:text-[#FAF0E6]/80 transition">Genres ▼</span>
          {showGenres && (
            <div className="absolute top-8 left-0 bg-[#5C5470]/90 rounded shadow-lg text-sm text-white p-4 space-y-2 z-10 w-40 backdrop-blur-sm">
              <Link to="/genre/action" className="block hover:text-[#FAF0E6]">Action</Link>
              <Link to="/genre/comedy" className="block hover:text-[#FAF0E6]">Comedy</Link>
              <Link to="/genre/drama" className="block hover:text-[#FAF0E6]">Drama</Link>
              <Link to="/genre/sci-fi" className="block hover:text-[#FAF0E6]">Sci-Fi</Link>
              <Link to="/genre/romance" className="block hover:text-[#FAF0E6]">Romance</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
