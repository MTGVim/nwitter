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
import Nweet from 'components/Nweet';

const Profile = ({ userObj, refreshDisplayName }) => {
  const [newDisplayName, setNewDisplayName] = useState("");
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
        await updateProfile(userObj, { displayName: newDisplayName });
      } catch (err) {
        console.error("Error updating Profile: ", err);
      }
      refreshDisplayName();
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
        return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === userObj.uid} />;
      })}
    </div>
  </>;
}
export default Profile;