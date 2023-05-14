import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import SignOut from "./SignOut";
import { NavLink } from "react-router-dom";
import defaultProfileImg from "../../assets/android-icon.png";
// when user is logged in, show user info + tabs + sign out button
const HandleUser = () => {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("Placeholder Username");

  const getProfilePicUrl = () => {
    return auth.currentUser.photoURL || defaultProfileImg;
  };
  const getUserName = () => {
    return auth.currentUser.displayName || "Placeholder Username";
  };

  useEffect(() => {
    setProfilePic(getProfilePicUrl);
    setUserName(getUserName);
  }, []);
  return (
    <>
      <NavLink to="/profile">{userName}</NavLink>
      <img src={profilePic} alt="your user profile" width={30} />
      <SignOut />
    </>
  );
};

export default HandleUser;
