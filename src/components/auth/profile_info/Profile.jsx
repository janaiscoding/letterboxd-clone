import React, { useState, useEffect } from "react";

import { auth } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import ProfilePoster from "./ProfilePoster";
import defaultProfileImg from "../../../assets/diary-icon.png";
import ChangeUserInfo from "../auth_methods/ChangeUserInfo";
import Poster from "../../UI_components/Poster";

const Profile = ({
  apiKey,
  authStatus,
  isProfileUpdated,
  setProfileUpdated,
  fetchRequest,
  fetchResults,
}) => {
  const [userName, setUserName] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [moviesIDs, setMoviesIDs] = useState([]);

  const fetchDatabaseData = async () => {
    const userId = auth.currentUser.uid;
    const userSnap = await getDoc(doc(db, "users", userId));
    if (userSnap.exists()) {
      let userFavs = userSnap.data().favourites;
      let tempArray = [];
      userFavs.forEach((FM) => {
        tempArray.push(FM.movieID);
      });
      setMoviesIDs(tempArray);
    }
  };

  useEffect(() => {
    if (authStatus) {
      console.log("user is logged in");
      setUserName(auth.currentUser.displayName);
      fetchDatabaseData();
      setProfileUpdated(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <h1>{userName}</h1>
      <img src={defaultProfileImg} alt="your user profile" width={30} />
      <div>DISPLAY FAVOURITE MOVIES FROM DB</div>
      {moviesIDs.length > 0
        ? moviesIDs.map((ID) => (
            <ProfilePoster
              key={ID}
              movieID={ID}
              apiKey={apiKey}
            />
          ))
        : "no fav movies yet"}
      <div>THIS WILL BE IN A SETTINGS PAGE</div>
      <ChangeUserInfo setProfileUpdated={setProfileUpdated} />
    </>
  );
};

export default Profile;
