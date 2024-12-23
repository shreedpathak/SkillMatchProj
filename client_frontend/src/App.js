import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Skill from "./pages/skill.js";
import Dashboard from "./pages/dashboard.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Skill />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;