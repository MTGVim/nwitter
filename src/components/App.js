
import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj(user);
        setDisplayName(user.displayName);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  function refreshDisplayName() {
    setDisplayName(userObj.displayName);
  };
  return (
    <>
      {init ? <AppRouter userObj={userObj} refreshDisplayName={refreshDisplayName} />: "Initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );
}

export default App;
