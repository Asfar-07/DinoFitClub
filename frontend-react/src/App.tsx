import { useEffect } from "react";
import "./App.css";
import "./styles/theme.css";
import "./styles/global.css";
import AppRoutes from "./routes/AppRoutes";
import { useSelector, useDispatch } from "react-redux";
import { setThemeFromLocal } from "./features/theme/themeSlice";
import { ToastContainer } from "react-toastify";
import type { RootState } from "./app/store";
import { BrowserRouter } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);


  useEffect(() => {
    dispatch(setThemeFromLocal());
  }, [dispatch]);

  useEffect(() => {
    const root = document.documentElement;

    let currentTheme = theme;

    if (currentTheme === "system") {
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      isDarkMode ? (currentTheme = "dark") : (currentTheme = "light") ;
    }

    if (currentTheme === "dark") {
      root.style.setProperty("--primary-bg-color", "#0a0f22");
      root.style.setProperty("--secondary-bg-color", "#1d2233");
      root.style.setProperty("--symbol-color", "#56b2bb");
      root.style.setProperty("--primary-text-color", "#f0f4f8");
      root.style.setProperty("--secondary-text-color", "#bac7cc");

    } if (currentTheme === "light") {
      root.style.setProperty("--primary-bg-color", "#ffffff");
      root.style.setProperty("--secondary-bg-color", "#f0f0f0");
      root.style.setProperty("--symbol-color", "#56b2bb");
      root.style.setProperty("--primary-text-color", "#0a0f22");
      root.style.setProperty("--secondary-text-color", "#555");

    }

  }, [theme]);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
