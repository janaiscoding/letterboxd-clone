import React from "react";

const UserNavbar = ({ profilePic, userName, arrowDown, setVisibility }) => {
  return (
    <div
      className="mx-3 flex items-center mt-2"
      onMouseEnter={() => setVisibility(true)}
    >
      <img
        src={profilePic}
        alt={userName}
        width={24}
        height={24}
        className="rounded-xl"
      />
      <span className="text-base text-sh-grey font-semibold hover:text-p-white uppercase mx-1">
        {userName}
      </span>
      <span>
        <img src={arrowDown} alt="arrow down indicator icon" />
      </span>
    </div>
  );
};
export default UserNavbar;
