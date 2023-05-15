import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { NavLink } from "react-router-dom";

const IntroMessage = () => {
  const [displayName, setDisplayName] = useState("");
  useEffect(() => {
    if (auth.currentUser !== null) {
      setDisplayName(auth.currentUser.displayName);
    }
  }, []);
  return (
    <>
      <div>
        Welcome back,
        <NavLink to="/profile"> {displayName}</NavLink>. Here's what we've been
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
