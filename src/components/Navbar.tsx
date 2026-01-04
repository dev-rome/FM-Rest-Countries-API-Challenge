import { Link } from "react-router";
import { ToggleButton } from "./ToggleButton";

export function Navbar() {
  return (
    <header className="bg-surface px-4 shadow-[0_2px_4px_0_rgba(0,0,0,0.0562)] md:px-10 lg:px-20">
      <div className="mx-auto max-w-7xl py-8 lg:py-6">
        <nav className="flex items-center justify-between">
          <Link to="/" className="font-extrabold md:text-lg lg:text-2xl">
            Where in the world?
          </Link>
          <ToggleButton />
        </nav>
      </div>
    </header>
  );
}
