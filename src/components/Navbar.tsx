import { Link } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="bg-white shadow-[0_2px_4px_0_rgba(0,0,0,0.0562)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-10 lg:py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-extrabold md:text-base lg:text-2xl">
            Where in the world?
          </Link>
          <button className="flex items-center gap-2">
            <FaMoon className="text-base lg:text-lg" />
            <span className="text-xs font-semibold lg:text-base">
              Dark Mode
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
