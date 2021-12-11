import React, { useEffect, useState } from 'react';
import {
  dbService,
  collection,
  onSnapshot,
} from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    onSnapshot(collection(dbService, "nweets"), (snapshot) => {
      const nweetObjArray = snapshot.docs.map(
        doc => ({ id: doc.id, ...doc.data() })
      );
      nweetObjArray.sort((a, b) => (b.createdAt - a.createdAt));
      setNweets(nweetObjArray);
    });
  }, [])

  return (
    <div className='container'>
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweetObj) => {
          return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === userObj.uid} />;
        })}
      </div>
    </div >
  );
};
export default Home;