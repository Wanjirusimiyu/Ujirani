import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";

function App() {
  return (
    <GoogleOAuthProvider clientId="767607723850-hbaanr47si7aiqdtf4qa5h3a59cirpth.apps.googleusercontent.com">
    <Router>
      <Routes>
        {/* Define the Login route */}
        <Route path="/login" element={<Login />} />

        {/* Define the SignUp route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Define the Home route */}
        <Route path="/" element={<Home />} />

       {/* Define the PostCard route */}
        <Route path="/post/new" element={<NewPost />} />

      </Routes>
    </Router>
  </GoogleOAuthProvider>  
  );
}

export default App;

