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
      <div className="text-h-grey text-center text-3xl font-normal">
        Welcome,{" "}
        <Link
          to={"/profile/" + uid}
          className="border-h-grey text-p-white hover:border-p-white border-b border-solid"
        >
          {displayName}
        </Link>
        .{" "}
        <span className="hidden pb-2 md:inline-block">
          Start your movie tracking journey now!
        </span>
      </div>
      <p className="text-h-grey mb-8 text-center text-lg md:mb-8">
        On Clonnerboxd you can...{" "}
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
        {" | "}
        <Link to="/reviews" className="text-p-white hover:text-hov-blue">
          Read all the reviews on the platform
        </Link>
        <span className="text-h-grey">
          {" "}
          or press the search icon in the header, and leave a review to your
          favorite movie!
        </span>
      </p>
    </>
  );
};

export default IntroMessage;
