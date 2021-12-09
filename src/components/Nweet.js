import React, { useState } from "react";
import { dbService,
  doc,
  deleteDoc,
  updateDoc,
  deleteObject,
  ref,
  storageService
} from "fbase";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    console.log(ok);
    if (ok) {
      // delete
      try {
        await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
        if(nweetObj.attachmentUrl){
          await deleteObject(ref(storageService, nweetObj.attachmentUrl))
        }
      }
      catch (err) {
        console.error("Error deleting doc: ", err);
      }
    }
  };
  const toggleEditing = () => setEditing(prev => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    // update
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`),{
      text: newNweet
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: {
        value,
      },
    } = event;
    setNewNweet(value);
  };
  return <div>
    {editing ? (
      isOwner && <>
        <form onSubmit={onSubmit}>
          <input 
            type="text"
            placeholder="Edit your Nweet"
            value={newNweet} 
            required
            onChange={onChange}
          />
          <input type="submit" value="Update Nweet"/>
        </form>
        <button onClick={toggleEditing}>Cancel</button>
      </>
    ) : (<>
      <h4>{nweetObj.text}</h4>
      {nweetObj.attachmentUrl && <>
        <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt="attachment"></img>
      </>}
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Nweet</button>
          <button onClick={toggleEditing}>Edit Nweet</button>
        </>
      )}
    </>
    )}
  </div>;
}

export default Nweet;