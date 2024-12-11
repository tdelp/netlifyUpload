import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./navbar/navbar";
import Main from "./Main/Main";
import Home from "./Main/Home"; 
import Profile from "./profile/profile"
import Species from "./species/species";
import AuthLogin from "./auth/AuthLogin";
import AuthRegister from "./auth/AuthRegister";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";

function Components() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        {/* Set Home as the default page */}
        <Route path="/" element={<Home />} />

        {/* Protect the Main component */}
        <Route
          path="/main"
          element={
            <ProtectedRoute element={Main} isAuthenticated={isAuthenticated} />
          }
        />

        {/* Protect the Species component */}
        <Route
          path="/species"
          element={
            <ProtectedRoute element={Species} isAuthenticated={isAuthenticated} />
          }
        />

        {/* Protect the Profile component */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute element={Profile} isAuthenticated={isAuthenticated} />
          }
        />

        {/* Login and Register routes */}
        <Route path="/login" element={<AuthLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<AuthRegister />} />
      </Routes>
    </Router>
  );
}

export default Components;

