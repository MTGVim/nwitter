import Nweet from 'components/Nweet';
import {
  dbService,
  collection,
  addDoc,
  storageService,
  onSnapshot,
  ref,
  uploadString,
  getDownloadURL
} from 'fbase';
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");

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
    let attachmentUrl = "";
    try {
      if(attachment !== ""){   
        const uploadResult = await uploadString(
          ref(storageService, `${userObj.uid}/${uuidv4()}`),
          attachment,
          "data_url");
          attachmentUrl = await getDownloadURL(uploadResult.ref);
      }
      await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        attachmentUrl,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
    setAttachment(null);
  }
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  }
  const onFileChange = (event) => {
    const { target: { files } } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const { target: { result } } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment("");
  return (<div>
    <form onSubmit={onSubmit}>
      <input
        value={nweet}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={120}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Nweet" />
      {attachment && (
        <div>
          <img src={attachment} width="50px" height="50px" alt={"staged one for attachment"} />
          <button onClick={onClearAttachment}>Clear</button>
        </div>
      )}
    </form>
    <div>
      {nweets.map((nweetObj) => {
        return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === userObj.uid} />;
      })}
    </div>
  </div>);
};
export default Home;