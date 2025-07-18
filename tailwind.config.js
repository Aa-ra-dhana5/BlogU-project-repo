/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Scan all necessary files
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Add DaisyUI plugin
  daisyui: {
    themes: [
      "light", "dark", "cupcake", "bumblebee", "emerald",
      "corporate", "synthwave", "retro", "cyberpunk",
      "valentine", "halloween", "garden", "forest",
      "aqua", "lofi", "pastel", "fantasy", "wireframe",
      "black", "luxury", "dracula", "cmyk", "autumn",
      "business", "acid", "lemonade", "night", "coffee",
      "winter"
    ],
    darkTheme: "dark", // Default dark theme
    base: true, // Enable base styles
    styled: true, // Enable styled components
    utils: true, // Enable utility classes
    logs: true, // Show DaisyUI logs for debugging
  },
};
