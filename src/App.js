import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Policy from "./pages/Policy/Policy";
import Question from "./pages/Questions/Questions";
import Connexion from "./pages/Connexion/Connexion";
import Thanks from "./pages/Thanks/Thanks";
import { GuideResponse } from "./pages/GuideResponse/GuideResponse";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/guide-response" element={<GuideResponse />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/thanks" element={<Thanks />} />
      </Routes>
    </Router>
  );
}
