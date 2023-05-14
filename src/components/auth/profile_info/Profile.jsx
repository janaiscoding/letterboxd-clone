import React, { useState, useEffect } from "react";

import { auth } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Poster from "../../Poster";
import defaultProfileImg from "../../../assets/diary-icon.png";

const Profile = ({ authStatus }) => {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("default username");
  const [favourites, setFavourites] = useState([]);

  const getProfilePicUrl = () => {
    return auth.currentUser.photoURL || defaultProfileImg;
  };

  const getUserName = () => {
    return auth.currentUser.displayName || "Test";
  };

  const fetchDatabaseData = async () => {
    const userRef = collection(db, auth.currentUser.uid);
    try {
      const query = await getDocs(userRef);
      let tempMovies = [];
      query.forEach((doc) => {
        tempMovies.push(doc.data());
      });
      setFavourites(tempMovies);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (authStatus) {
      setProfilePic(getProfilePicUrl);
      setUserName(getUserName);
      fetchDatabaseData();
    }
  }, [authStatus]);
  return (
    <>
      <h1>{userName}</h1>
      <img src={profilePic} alt="your user profile" width={30} />
      <div> ur fav movies</div>
      {favourites.length === 0
        ? "no favourite movies yet"
        : favourites.map((doc) => (
            <Poster key={doc.movie.id} movie={doc.movie} />
          ))}
    </>
  );
};

export default Profile;
