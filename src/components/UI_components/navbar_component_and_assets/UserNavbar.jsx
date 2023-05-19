import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase/firebase";

const UserNavbar = ({ profilePic, userName, arrowDown, setShowDropdown }) => {
  const uid = auth.currentUser.uid;
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
        className="rounded-xl"
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
