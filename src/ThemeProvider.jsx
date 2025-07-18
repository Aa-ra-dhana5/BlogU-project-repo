import { useEffect } from "react";

const ThemeProvider = ({ theme }) => {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return null; // No UI needed, just handling theme changes
};

export default ThemeProvider;
