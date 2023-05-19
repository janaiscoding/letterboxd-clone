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

  return (
    <>
      <div
        className="flex 
      w-[50%]
      m-auto
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
      >
        <p className="text-sm hover:text-hov-blue hover:cursor-pointer uppercase">
          CHANGE YOUR USERNAME
        </p>{" "}
      </div>
      <div
        className="flex 
      w-[50%]
      m-auto gap-3"
      >
        <input
          value={newName}
          type="text"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button className="px-3 py-2 rounded font-bold bg-[#567] text-p-white text-xs sans-serif" onClick={updateUserName}>Save new name</button>
      </div>
      {/* 
      <button onClick={changePP}>change pp</button> */}
    </>
  );
};

export default ChangeUserInfo;
