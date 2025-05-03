import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/auth/AuthPage';

// Placeholder for Home component
const Home = () => (
  <div className="home-container">
    <h1>Welcome to Connect-Sphere</h1>
    <p>This is the home page after successful login</p>
  </div>
);

function App() {
  // This would typically check for a valid token in localStorage or context
  const isAuthenticated = false; // Set to true to bypass login for testing

  return (
    <Router>
      <div className="App">
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
            element={isAuthenticated ? <Home /> : <Navigate to="/auth" />} 
          />
          
          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
