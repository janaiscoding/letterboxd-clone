import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import { Link } from "react-router-dom";

const IntroMessage = ({ authStatus }) => {
  const [displayName, setDisplayName] = useState("");
  const [uid, setUid] = useState("");
  useEffect(() => {
    if (authStatus) {
      setDisplayName(auth.currentUser.displayName);
      setUid(auth.currentUser.uid);
    }
  }, [authStatus]);
  return (
    <>
      <div className="text-h-grey text-3xl text-center font-normal">
        Welcome back,{" "}
        <Link
          to={"/profile/" + uid}
          className="text-p-white border-b border-solid border-h-grey hover:border-p-white"
        >
          {displayName}
        </Link>
        .{" "}
        <span className="hidden md:inline-block">
          Here's what we've been watching...
        </span>
      </div>
      <p className="text-center mb-8 md:mb-8 text-lg text-h-grey">
        This homepage will become customized as{" "}
        <Link to="/members" className="text-p-white hover:text-hov-blue">
          you follow active members
        </Link>{" "}
        on Clonnerboxd.
      </p>
    </>
  );
};

export default IntroMessage;
