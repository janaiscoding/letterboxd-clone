import React, { useState, useEffect } from "react";

import { auth } from "../../../firebase/firebase";
import { db } from "../../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import Poster from "../../UI_components/Poster";
import defaultProfileImg from "../../../assets/diary-icon.png";
import ChangeUserInfo from "../auth_methods/ChangeUserInfo";
const Profile = ({ authStatus, isProfileUpdated, setProfileUpdated }) => {
  const [userName, setUserName] = useState("");

  // const fetchDatabaseData = async () => {
  //   const userRef = collection(db, auth.currentUser.uid);
  //   try {
  //     const query = await getDocs(userRef);
  //     let tempMovies = [];
  //     query.forEach((doc) => {
  //       tempMovies.push(doc.data());
  //     });
  //     setFavourites(tempMovies);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  useEffect(() => {
    if (authStatus) {
    setUserName(auth.currentUser.displayName);
    setProfileUpdated(false);
    }
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <h1>{userName}</h1>
      <img src={defaultProfileImg} alt="your user profile" width={30} />
      {/* <div> ur fav movies</div>
      {favourites.length === 0
        ? "no favourite movies yet"
        : favourites.map((doc) => (
            <Poster key={doc.movie.id} movie={doc.movie} />
          ))} */}
          <div>THIS WILL BE IN A SETTINGS PAGE</div>
      <ChangeUserInfo setProfileUpdated={setProfileUpdated} />
    </>
  );
};

export default Profile;
