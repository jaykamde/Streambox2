import { MagnifyingGlassIcon, BellIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-8">
          <h1 className="text-red-600 font-extrabold text-xl tracking-wide">
            NETFLIX
          </h1>

          <nav className="hidden md:flex gap-6 text-sm text-white/90">
            <span className="cursor-pointer">Home</span>
            <span className="cursor-pointer">Shows</span>
            <span className="cursor-pointer">Movies</span>
            <span className="cursor-pointer">New & Popular</span>
            <span className="cursor-pointer">My List</span>
          </nav>
        </div>

        <div className="flex items-center gap-5 text-white">
          <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer" />
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <div className="w-8 h-8 rounded bg-gray-500" />
        </div>
      </div>
    </header>
  );
}
