import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";

const IntroMessage = ({ authStatus }) => {
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (authStatus) {
      setDisplayName(auth.currentUser.displayName);
      console.log("user is logged in");
    }
  }, [authStatus]);
  return (
    <>
      <div className="text-h-grey font-bold underline">
        Welcome back,
        <NavLink to="/profile" className="text-l-white"> {displayName}</NavLink>. Here's what we've been
        watching...
      </div>
      <p>
        This homepage will become customized as you follow active members on
        Clonnerboxd.
      </p>
    </>
  );
};

export default IntroMessage;
