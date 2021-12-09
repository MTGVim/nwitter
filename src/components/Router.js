import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation"
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return <Router>
      {isLoggedIn && <Navigation></Navigation>}
      <Routes>
        {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={ userObj } />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )
        }
        <Route path="*" element={<Navigate to="/"></Navigate>} />
      </Routes>
    </Router>
}

export default AppRouter;