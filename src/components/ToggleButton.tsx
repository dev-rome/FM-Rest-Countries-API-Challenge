import { useTheme } from "../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

export function ToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 lg:cursor-pointer"
    >
      {theme === "light" ? (
        <FaMoon className="text-base lg:text-lg" />
      ) : (
        <FaSun className="text-base lg:text-lg" />
      )}
      <span className="font-semibold lg:text-base">
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
