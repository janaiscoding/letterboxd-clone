import React from "react";
import Image from "next/image";
import Link from "next/link";

const UserNavbar = ({
  currentUserId,
  profilePic,
  userName,
  arrowDown,
  setShowDropdown,
}) => {
  return (
    <div
      className="z-50 mx-1 mt-2 flex cursor-pointer items-center"
      onMouseEnter={() => setShowDropdown(true)}
    >
      <Image
        src={profilePic}
        alt={userName}
        width={24}
        height={24}
        className="max-h-[24px] max-w-[24px] rounded-full"
      />
      <Link
        href={"/profile/" + currentUserId}
        id="userName"
        className="sans-serif text-sh-grey hover:text-p-white mx-1 text-xs font-bold uppercase tracking-widest"
      >
        {userName}
      </Link>

      <Image
        src={arrowDown}
        alt="arrow down indicator icon"
        className="ml-1 mt-[-7px]"
      />
    </div>
  );
};
export default UserNavbar;
