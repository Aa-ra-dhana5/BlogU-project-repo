import React from "react";
import { IoColorPaletteSharp } from "react-icons/io5"; // Import theme icon

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween",
  "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
  "wireframe", "black", "luxury", "dracula", "cmyk", "autumn",
  "business", "acid", "lemonade", "night", "coffee", "winter"
];

const ThemeSelector = ({ theme, setTheme }) => {
  return (
    <div className="absolute p-4 top-16 right-1 z-50">
      <div className="dropdown dropdown-end">
        {/* Icon Button to Open Dropdown */}
        <button tabIndex={0} className="btn btn-circle bg-base-300 hover:bg-base-400">
          <IoColorPaletteSharp className="text-xl" />
        </button>

        {/* Dropdown Menu */}
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 max-h-60 overflow-y-auto">
          {themes.map((t) => (
            <li key={t}>
              <button
                onClick={() => setTheme(t)}
                className={`w-full text-left ${theme === t ? "font-bold text-primary" : ""}`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ThemeSelector;
