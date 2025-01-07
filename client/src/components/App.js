import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";

function App() {
  return (
    <GoogleOAuthProvider clientId="767607723850-hbaanr47si7aiqdtf4qa5h3a59cirpth.apps.googleusercontent.com">
    <Router>
      <Routes>
        {/* Define the Login route */}
        <Route path="/login" element={<Login />} />

        {/* Define the SignUp route */}
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Home />} />

      </Routes>
    </Router>
  </GoogleOAuthProvider>  
  );
}

export default App;

