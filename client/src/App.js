
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './pages/Feed/Components/Feed.css'; // Fixed path with correct capitalization
import AuthPage from './pages/auth/AuthPage';
import { FeedHome } from './pages/Feed/Components'; // Fixed path with correct capitalization

// Dark mode context
export const DarkModeContext = React.createContext();


function App() {
  // This would typically check for a valid token in localStorage or context
  const isAuthenticated = false; // Set to true to bypass login for testing
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Check for user's preferred color scheme
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Toggle dark mode function to pass to components
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <Router>
        <div className="App">
          {/* Dark mode toggle button - visible on all pages */}
          <button 
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          
          <Routes>
            {/* Redirect to home if already authenticated, otherwise show auth page */}
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/home" /> : <AuthPage />} 
            />
            
            {/* Auth page route */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected route - only accessible after login */}
            <Route 
              path="/home" 
              element={isAuthenticated ? <FeedHome /> : <Navigate to="/auth" />} 
            />
            
            {/* Test route for FeedHome - remove this in production */}
            <Route path="/feed-test" element={<FeedHome />} />
            
            {/* Catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </DarkModeContext.Provider>
  );
}

export default App;
