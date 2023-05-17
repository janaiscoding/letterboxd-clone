import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import Sappling from './sappling.jpg'
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
  //     photoURL: 'https://cdn.discordapp.com/attachments/948205733688786974/1108464787651833987/image.png',
  //   }).then(() => {
  //       console.log(auth.currentUser.photoURL)
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
{/* 
      <button onClick={changePP}>change pp</button> */}

    </>
  );
};

export default ChangeUserInfo;
