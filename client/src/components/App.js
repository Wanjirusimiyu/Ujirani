import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";


function App() {
  return <>
      <SignUp />
      <Login />
  </>;
}

export default App;
