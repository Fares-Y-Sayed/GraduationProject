import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FaSun, FaMoon, FaAdjust } from 'react-icons/fa';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-content">
        {isDarkMode ? (
          <FaSun className="theme-icon sun-icon" />
        ) : (
          <FaMoon className="theme-icon moon-icon" />
        )}
        <FaAdjust className="theme-icon adjust-icon" />
      </div>
    </button>
  );
};

export default ThemeToggle; 