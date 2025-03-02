import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "../Auth/SignOut";

const DropdownDesktop = ({
  currentUserId,
  userName,
  profilePic,
  arrowDown,
  setShowDropdown,
}) => {
  const dropdownList = [
    {
      id: "1",
      name: "Home",
      link: "/",
    },
    {
      id: "2",
      name: "Films",
      link: "/films",
    },
    {
      id: "3",
      name: "Members",
      link: "/members",
    },
    {
      id: "4",
      name: "Reviews",
      link: "/reviews",
    },
  ];

  return (
    <div
      className="bg-drop-grey z-50 flex cursor-pointer flex-col self-start rounded-sm pb-2 pt-2"
      onMouseLeave={() => setShowDropdown(false)}
    >
      <div className="mx-1 flex items-center">
        <Image
          src={profilePic}
          alt={userName}
          width={24}
          height={24}
          className="max-h-[24px] max-w-[24px] rounded-full"
        />
        <Link
          href={"/profile/" + currentUserId}
          className="sans-serif hover:cursor text-p-white hover:text-p-white mx-1 text-xs font-bold uppercase tracking-widest"
        >
          {userName}
        </Link>

        <Image
          src={arrowDown}
          alt="arrow down indicator icon"
          className="ml-1 mt-[-7px]"
        />
      </div>
      <ul
        className="bg-drop-grey text-drop-black rounded-sm"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <li className="divider"></li>
        <li>
          <Link
            className="sans-serif hover:bg-dd-blue hover:text-p-white block px-4 py-1 text-xs tracking-normal  hover:cursor-pointer"
            href={"/profile/" + currentUserId}
          >
            Profile
          </Link>
        </li>
        {dropdownList.map((L) => (
          <li key={L.id}>
            <Link
              href={L.link}
              className="sans-serif hover:bg-dd-blue hover:text-p-white block px-4 py-1  text-xs  tracking-normal"
            >
              {L.name}
            </Link>
          </li>
        ))}
        <li className="divider">
          <Link
            href="/settings"
            className="sans-serif hover:bg-dd-blue hover:text-p-white block px-4 py-1  text-xs"
          >
            Settings
          </Link>
        </li>
        <li className="sans-serif hover:bg-dd-blue hover:text-p-white px-4 py-1  text-xs hover:cursor-pointer">
          <SignOut />
        </li>
      </ul>
    </div>
  );
};

export default DropdownDesktop;
