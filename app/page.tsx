"use client";
import { useEffect, useState } from "react";
import App from "../src/App";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/firebase";
import Navbar from "./components/Navigation/Navbar";

export default function Page() {
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  //this handles the login/logout styles and displays in the navbar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransparentNav, setIsTransparentNav] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || "");
        setProfilePic(user.photoURL || "");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setIsTransparentNav(true);
      }
    });
  }, []);
  return (
    <>
      <Navbar
        userName={userName}
        profilePic={profilePic}
        isLoggedIn={isLoggedIn}
        isTransparentNav={isTransparentNav}
      />
      <App />
    </>
  );
}
