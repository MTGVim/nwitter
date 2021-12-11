import React, { useState } from "react";
import {
  dbService,
  doc,
  deleteDoc,
  updateDoc,
  deleteObject,
  ref,
  storageService
} from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        if (nweetObj.attachmentUrl) {
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
    await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
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
  return <div className="nweet">
    {editing ? (
      isOwner && <>
        <form onSubmit={onSubmit} className="container nweetEdit">
          <input
            type="text"
            placeholder="Edit your Nweet"
            value={newNweet}
            required
            autoFocus
            onChange={onChange}
            className="formInput"
          />
          <input type="submit" value="Update Nweet" className="formBtn" />
        </form>
        <button onClick={toggleEditing} className="formBtn cancelBtn">
          Cancel
        </button>
      </>
    ) : (<>
      <h4>{nweetObj.text}</h4>
      {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} alt="attachment" />}
      {isOwner && (
        <div className="nweet__actions" >
          <span onClick={onDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        </div>
      )}
    </>
    )}
  </div >;
}

export default Nweet;