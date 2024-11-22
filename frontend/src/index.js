import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Login from "./Components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tickets" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
