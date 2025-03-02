"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "src/firebase/firebase";
import Navbar from "./Navbar";

export const LayoutNavbar = () => {
  const [user, setUser] = useState<any>();

  //this handles the login/logout styles and displays in the navbar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransparentNav, setIsTransparentNav] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setIsTransparentNav(true);
      }
    });
  });
  return (
    <Navbar
      userName={user?.displayName}
      profilePic={user?.photoURL}
      isLoggedIn={isLoggedIn}
      isTransparentNav={isTransparentNav}
    />
  );
};
