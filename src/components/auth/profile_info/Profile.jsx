import React, { useState, useEffect } from "react";

import { auth } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import ProfilePoster from "./ProfilePoster";
import defaultProfileImg from "../../../assets/diary-icon.png";
import ChangeUserInfo from "../auth_methods/ChangeUserInfo";

const Profile = ({
  apiKey,
  authStatus,
  isProfileUpdated,
  setProfileUpdated,
}) => {
  const [userName, setUserName] = useState("");
  const [favIDs, setFavIDs] = useState([]);
  const [watchedIDs, setWatchedIDs] = useState([]);

  const fetchUserMoviesDB = () => {
    fetchFavouritesDB();
    fetchWatchedDB();
  };

  const fetchFavouritesDB = async () => {
    const userId = auth.currentUser.uid;
    const userSnap = await getDoc(doc(db, "users", userId));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().favourites;
      let tempArray = [];
      userFavs.forEach((FM) => {
        tempArray.push(FM.movieID);
      });
      setFavIDs(tempArray);
    }
  };
  const fetchWatchedDB = async () => {
    const userId = auth.currentUser.uid;
    const userSnap = await getDoc(doc(db, "users", userId));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().watched;
      let tempArray = [];
      userFavs.forEach((WM) => {
        tempArray.push(WM.movieID);
      });
      setWatchedIDs(tempArray);
    }
  };

  useEffect(() => {
    if (authStatus) {
      console.log("user is logged in");
      setUserName(auth.currentUser.displayName);
      fetchUserMoviesDB();
      setProfileUpdated(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <h1>{userName}</h1>
      <img src={defaultProfileImg} alt="your user profile" width={30} />
      <div>DISPLAY FAVOURITE MOVIES FROM DB</div>
      {favIDs.length > 0
        ? favIDs.map((ID) => (
            <ProfilePoster key={ID} movieID={ID} apiKey={apiKey} />
          ))
        : "no fav movies yet"}
      <div>DISPLAY WATCHED MOVIES FROM DB</div>
      {watchedIDs.length > 0
        ? watchedIDs.map((ID) => (
            <ProfilePoster key={ID} movieID={ID} apiKey={apiKey} />
          ))
        : "no watched movies yet"}
      <div>THIS WILL BE IN A SETTINGS PAGE</div>
      <ChangeUserInfo setProfileUpdated={setProfileUpdated} />
    </>
  );
};

export default Profile;
