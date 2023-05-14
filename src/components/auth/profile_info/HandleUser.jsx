import React, { useEffect, useState } from "react";
import { auth } from "../../../firebase/firebase";
import SignOut from "../auth_methods/SignOut";
import { NavLink } from "react-router-dom";
import defaultProfileImg from "../../../assets/diary-icon.png";
// when user is logged in, show user info + tabs + sign out button

const HandleUser = () => {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("Test");

  const getProfilePicUrl = () => {
    return auth.currentUser.photoURL || defaultProfileImg;
  };
  const getUserName = () => {
    return auth.currentUser.displayName || "Test";
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
