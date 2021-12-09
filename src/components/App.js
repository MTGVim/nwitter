
import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import AppRouter from "components/Router";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setUserObj({
          ...user
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [])
  function refreshUser() {
    setUserObj({...authService.currentUser});
  };
  return (
    <>
      {init ? <AppRouter userObj={userObj} refreshUser={refreshUser} />: "Initializing..."}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );
}

export default App;
