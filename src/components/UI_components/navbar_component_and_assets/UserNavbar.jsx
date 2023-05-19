import React from "react";

const UserNavbar = ({ profilePic, userName, arrowDown, setShowDropdown }) => {
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
      <span className="sans-serif text-xs text-sh-grey font-bold tracking-widest hover:text-p-white mx-1 uppercase">
        {userName}
      </span>
      <span>
        <img src={arrowDown} alt="arrow down indicator icon" className="ml-1" />
      </span>
    </div>
  );
};
export default UserNavbar;
