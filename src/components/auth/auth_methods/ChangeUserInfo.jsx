import React, { useState } from "react";
import { auth } from "../../../firebase/firebase";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const ChangeUserInfo = ({ setProfileUpdated }) => {
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const navigate = useNavigate();

  const updatePFP = () => {
    updateProfile(auth.currentUser, {
      photoURL:
        "https://cdn.discordapp.com/attachments/1090380369502683217/1166998168085467136/jonny-mckenna-4igCpD-Lnfg-unsplash.jpg?ex=654c86bd&is=653a11bd&hm=5b3536cb660494ee5c5fbb9af95daed2ab68f313d41af19d3c5c42abc837b1f0&",
    });
  };
  const updateUserName = () => {
    if (newName === "") {
      createPopup("error");
    } else {
      updateProfile(auth.currentUser, {
        displayName: newName,
      })
        .then(() => {
          changeLoggedUsername(auth.currentUser.uid);
          createPopup("name-change");
          setProfileUpdated(true);
          setNewName("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const changeLoggedUsername = async (uid) => {
    const userSnap = doc(db, "users", uid);
    await updateDoc(userSnap, {
      name: newName,
    }).then(() => {
      createPopup("name-change");
      setProfileUpdated(true);
      setNewName("");
    });
  };

  const updateUserBio = async (uid) => {
    const userSnap = doc(db, "users", uid);
    await updateDoc(userSnap, {
      bio: newBio,
    }).then(() => {
      createPopup("bio-change");
      setProfileUpdated(true);
      setNewBio("");
    });
  };
  const goToProfile = (uid) => {
    navigate("/profile/" + uid);
  };
  const createPopup = (action) => {
    const popupAlert = document.createElement("div");
    popupAlert.classList.add("popup");
    if (action === "name-change") {
      popupAlert.innerText = `Your new username was updated successfully!`;
    } else if (action === "error") {
      popupAlert.innerText = `Your username cannot be empty!`;
    } else if (action === "bio-change") {
      popupAlert.innerText = `You new bio was updated successfully!`;
    }
    document.body.append(popupAlert);
    setTimeout(() => {
      popupAlert.remove();
    }, 1000);
  };

  return (
    <>
      <div
        className="section-heading 
      m-auto
      mb-3
      flex 
      w-[50%] 
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey"
      >
        <p className="text-sm uppercase hover:cursor-pointer hover:text-hov-blue">
          CHANGE YOUR USERNAME
        </p>{" "}
      </div>
      <div
        className="m-auto 
        flex
        w-[50%]
      flex-col
      gap-3 md:flex-row"
      >
        <input
          value={newName}
          type="text"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={updateUserName}
        >
          Save new name
        </button>
      </div>
      <div
        className="section-heading 
      m-auto
      mb-3
      mt-4
      flex 
      w-[50%] 
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey"
      >
        <p className="text-sm uppercase hover:cursor-pointer hover:text-hov-blue">
          CHANGE YOUR BIO
        </p>{" "}
      </div>
      <div
        className="m-auto 
        flex
        w-[50%]
      flex-col
      gap-3 md:flex-row"
      >
        <input
          value={newBio}
          type="text"
          onChange={(e) => setNewBio(e.target.value)}
        />
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={() => updateUserBio(auth.currentUser.uid)}
        >
          Save new bio
        </button>
      </div>
      <div className="mt-10 flex items-center justify-center">
        <button
          className="sans-serif rounded bg-[#567] px-3 py-2 text-xs font-bold text-p-white"
          onClick={() => goToProfile(auth.currentUser.uid)}
        >
          Go back to profile
        </button>
      </div>

      {/* <button onClick={updatePFP}>change pp</button> */}
    </>
  );
};

export default ChangeUserInfo;
