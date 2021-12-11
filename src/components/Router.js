import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation"
import Profile from "routes/Profile";

const AppRouter = ({ userObj, refreshUser }) => {
  return <Router>
    {userObj && <Navigation userObj={userObj}></Navigation>}
    <Routes>
      {userObj ? (
        <>
          <Route path="/" element={
            <div style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}>
              <Home userObj={userObj} />
            </div>
          } />
          <Route path="/profile" element={
            <div style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}>
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </div>
          } />
        </>
      ) : (
        <Route path="/" element={<Auth />} />
      )
      }
      <Route path="*" element={<Navigate to="/"></Navigate>} />
    </Routes>
  </Router >
}

export default AppRouter;