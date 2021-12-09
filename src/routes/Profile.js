import React, { useEffect, useState } from 'react';
import {
  authService,
  dbService,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  updateProfile
} from 'fbase';

const Profile = ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [myNweets, setMyNweets] = useState([]);
  const onLogoutClick = () => {
    authService.signOut();
  };
  const getMyNweets = async () => {
    const stmt = query(collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc"));
    const nweets = await getDocs(stmt);
    const data = [];
    nweets.forEach((doc)=>data.push({ id: doc.id, ...doc.data()}));
    setMyNweets(data);
  };
  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const { target: { value } } = event;
    setNewDisplayName(value);
  }
  const onSubmit = async (event) => {
    event.preventDefault();
    if(userObj.displayName !== newDisplayName){
      try {
        // #1. React의 setState 함수를 통하지 않고, userObj가 참조중인 값을 변경해버림
        await updateProfile(authService.currentUser, { displayName: newDisplayName });
      } catch (err) {
        console.error("Error updating Profile: ", err);
      }
      // 위의 #1.로 인해 리렌더가 되지 않는 상태가 되므로, state를 강제로 갈아낌 (pojo라서 안전)
      refreshUser();
    }
  }

  return <>
    <form onSubmit={onSubmit}>
      <input type="text" value={newDisplayName} onChange={onChange} placeholder="Display name" />
      <input type="submit" value="Update Profile" />
    </form>
    <button onClick={onLogoutClick}>Log Out</button>
    <div>
      {myNweets.map((nweetObj) => {
        return <div>{nweetObj.text}</div>;
      })}
    </div>
  </>;
}
export default Profile;