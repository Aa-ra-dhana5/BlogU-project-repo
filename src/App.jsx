import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material"; // MUI Components
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import ThemeSelector from "./ThemeSelector";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();

  // Apply the theme globally
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Handle user authentication
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div data-theme={theme} className="h-screen w-screen flex flex-col">
      {/* Theme Selector */}
      <ThemeSelector theme={theme} setTheme={setTheme} />

      {/* Header Section */}
      <Header />

      {/* Main Content Section - Fullscreen */}
      <main className="flex-grow w-screen flex justify-center items-center">
        <Container
          className="w-full h-full  rounded-lg  flex flex-col justify-center items-center"
        >
          <Outlet />
        </Container>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  ) : null;
}

export default App;
