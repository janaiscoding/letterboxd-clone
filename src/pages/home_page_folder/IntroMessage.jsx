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
      <div className="text-h-grey text-3xl text-center font-normal">
        Welcome back,{" "}<NavLink to="/profile" className="text-p-white border-b border-solid border-h-grey hover:border-p-white">{displayName}</NavLink>. <span className="hidden md:inline-block">Here's what we've been
        watching...</span>
      </div>
      <p className="text-center mb-8 md:mb-8 text-lg text-h-grey">
        This homepage will become customized as <a href="/" className="text-p-white hover:text-hov-blue">you follow active members</a> on
        Clonnerboxd.
      </p>
    </>
  );
};

export default IntroMessage;
