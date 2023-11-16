import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase";

const UserNavbar = ({
  authStatus,
  profilePic,
  userName,
  arrowDown,
  setShowDropdown,
}) => {
  const [uid, setUid] = useState();
  useEffect(() => {
    if (authStatus) {
      setUid(auth.currentUser.uid);
    }
  }, [authStatus]);
  return (
    <div
      className="flex items-center mt-2 mx-1"
      onMouseEnter={() => setShowDropdown(true)}
    >
      <img
        src={profilePic}
        alt={userName}
        width={24}
        height={24}
        className="rounded-full max-w-[24px] max-h-[24px]"
      />
      <Link
        to={"/profile/" + uid}
        className="sans-serif text-xs text-sh-grey font-bold tracking-widest hover:text-p-white mx-1 uppercase"
      >
        {userName}
      </Link>
      <span>
        <img src={arrowDown} alt="arrow down indicator icon" className="ml-1" />
      </span>
    </div>
  );
};
export default UserNavbar;
