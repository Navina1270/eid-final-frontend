"use client"; // needed if using Next.js 13+ App Router
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // your global state
  const [theme, setTheme] = useState("dark");

  // Optional: persist theme in localStorage
  //   useEffect(() => {
  //     const savedTheme = localStorage.getItem("theme");
  //     if (savedTheme) setTheme(savedTheme);
  //   }, []);

  // Store theme in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, theme, setTheme, toggleTheme }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
