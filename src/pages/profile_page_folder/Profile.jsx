/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { auth } from "../../firebase/firebase";
import { db } from "../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

import UserFavouriteFilms from "./UserFavouriteFilms";
import UserBio from "./UserBio";
import UserWatchedFilms from "./UserWatchedFilms";

const Profile = ({
  apiKey,
  authStatus,
  isProfileUpdated,
  setProfileUpdated,
  newDataGained,
  setNewDataGained,
}) => {
  const [favIDs, setFavIDs] = useState([]);
  const [watchedIDs, setWatchedIDs] = useState([]);

  const [favCount, setFavCount] = useState(0);
  const [watchedCount, setWatchedCount] = useState(0);
  const fetchUserMoviesDB = () => {
    fetchFavouritesDB();
    fetchWatchedDB();
    setNewDataGained(false);
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
      setFavCount(tempArray.length);
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
      setWatchedCount(tempArray.length);
    }
  };
  useEffect(() => {
    if (authStatus) {
      fetchUserMoviesDB();
    }
    console.log("profile got new data so im refreshing here");
  }, [newDataGained]);

  return (
    <div className="site-body py-5">
      <div className="px-4 flex flex-col md:py-8 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <UserBio
          authStatus={authStatus}
          isProfileUpdated={isProfileUpdated}
          setProfileUpdated={setProfileUpdated}
          favCount={favCount}
          watchedCount={watchedCount}
          newDataGained={newDataGained}
        />

        <UserFavouriteFilms
          favIDs={favIDs}
          apiKey={apiKey}
          setNewDataGained={setNewDataGained}
        />
        <UserWatchedFilms
          watchedIDs={watchedIDs}
          apiKey={apiKey}
          setNewDataGained={setNewDataGained}
        />
      </div>
    </div>
  );
};

export default Profile;
/* <h1>{userName}</h1>
      <img src={userPic} alt="your user profile" width={100} height={100} className="rounded-[50px] border border-p-white hover:border-white " />
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
      <ChangeUserInfo setProfileUpdated={setProfileUpdated} /> */
