// DarkLight.jsx
import React, { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import './theme.css'
export default function DarkLight() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  // Use useEffect to set the data-theme attribute on the root element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme); // Set data-theme on <html>
  }, [theme]);

  function handleThemeToggle() {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle between light and dark themes
  }

  return (
    <div className="container">
      <p>Hello World!</p>
      <button onClick={handleThemeToggle}>Change Theme</button>
    </div>
  );
}
