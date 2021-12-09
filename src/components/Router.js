import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation"
import Profile from "routes/Profile";

const AppRouter = ({ userObj, refreshDisplayName }) => {
  return <Router>
    {userObj && <Navigation displayName={userObj.displayName}></Navigation>}
    <Routes>
      {userObj ? (
        <>
          <Route path="/" element={<Home userObj={userObj} />} />
          <Route path="/profile" element={
            <Profile userObj={userObj}
              refreshDisplayName={refreshDisplayName} />
            }
          />
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