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
        Welcome,{" "}
        <Link
          to={"/profile/" + uid}
          className="text-p-white border-b border-solid border-h-grey hover:border-p-white"
        >
          {displayName}
        </Link>
        .{" "}
        <span className="hidden md:inline-block">
          Start your movie tracking journey now!
        </span>
      </div>
      <p className="text-center mb-8 md:mb-8 text-lg text-h-grey">
        Things to do on Clonnerboxd...{" "}
        <Link
          to={"/profile/" + uid}
          className="text-p-white hover:text-hov-blue"
        >
          See your profile
        </Link>
        {" | "}
        <Link to="/members" className="text-p-white hover:text-hov-blue">
          See the registed members
        </Link>
        {" | "}
        <Link to="/films" className="text-p-white hover:text-hov-blue">
          Filter movies based on your criteria
        </Link>
        <span className="text-h-grey">
          {" "}
          or search for your favourite movie in the navbar leave a review for
          it!
        </span>
      </p>
    </>
  );
};

export default IntroMessage;
