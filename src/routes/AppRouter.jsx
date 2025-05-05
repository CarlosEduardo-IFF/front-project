import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RouteHandler from "./RouteHandler";

const AppRouter = () => {
  return (
    
      <Router>
        <Routes>
          <Route path="/*" element={<RouteHandler />} />
        </Routes>
      </Router>

  );
};

export default AppRouter;