import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import SignOut from "./SignOut";
// when user is logged in, show user info + tabs + sign out button
const HandleUser = () => {
  const [profilePic, setProfilePic] = useState("");
  const [userName, setUserName] = useState("default username");
  const getProfilePicUrl = () => {
    return auth.currentUser.photoURL;
    //or default pic
  };
  const getUserName = () => {
    return auth.currentUser.displayName;
  };
  useEffect(() => {
    setProfilePic(getProfilePicUrl);
    setUserName(getUserName);
  }, []);
  return (
    <>
      <p>User Info:</p>
      <img src={profilePic} alt="your user profile" />
      <p>your username: {userName}</p>
      <SignOut />
    </>
  );
};

export default HandleUser;
