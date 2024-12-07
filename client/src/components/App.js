import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the Login route */}
        <Route path="/login" element={<Login />} />

        {/* Define the SignUp route */}
        <Route path="/signup" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;

