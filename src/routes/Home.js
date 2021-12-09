import Nweet from 'components/Nweet';
import { dbService, collection, addDoc } from 'fbase';
import { onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetObjArray = snapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() })
      );
      setNweets(nweetObjArray);
    });
  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      console.log("Document written by: ", userObj.uid);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  }
  return (<div>
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input
        type="submit"
        value="Nweet" />
    </form>
    <div>
      {nweets.map((nweetObj) => {
        return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === userObj.uid} />;
      })}
    </div>
  </div>);
};
export default Home;