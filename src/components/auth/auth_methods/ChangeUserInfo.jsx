import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";

const ChangeUserInfo = ({ setProfileUpdated }) => {
  const [newName, setNewName] = useState("");

  const updateUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: newName,
    })
      .then(() => {
        console.log(
          "display name updated on button click",
          auth.currentUser.displayName
        );
        setProfileUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const changePP = () => {
  //   updateProfile(auth.currentUser, {
  //     photoURL: Sappling,
  //   }).then(() => {
  //     console.log('welcome as a testing account user!')
  //   })
  // };
  return (
    <>
      <div>change name</div>
      <input
        value={newName}
        type="text"
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={updateUserName}>Save new name</button>

      {/* <button onClick={changePP}>change pp</button> */}
      {/* <div>change bio</div>
      <input
        value={newBio}
        type="text"
        onChange={(e) => setNewBio(e.target.value)}
      />
      <button onClick={updateUserBio}>Save new bio</button> */}
    </>
  );
};

export default ChangeUserInfo;
