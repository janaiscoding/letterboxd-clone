import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import { auth } from "../../../firebase/firebase";
import Image from "next/image";

const DropdownDesktop = ({
  authStatus,
  userName,
  profilePic,
  arrowDown,
  setShowDropdown,
}) => {
  const dropdownList = dropdownLinksData;
  const [uid, setUid] = useState("");

  useEffect(() => {
    if (authStatus) {
      setUid(auth.currentUser.uid);
    }
  }, [authStatus]);
  return (
    <>
      <div
        className="bg-drop-grey z-50 flex flex-col self-start rounded-sm pb-2 pt-2"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="z-50 mx-1 flex items-center">
          <Image
            src={profilePic}
            alt={userName}
            width={24}
            height={24}
            className="z-50 max-h-[24px] max-w-[24px] rounded-full"
          />
          <Link
            to={"/profile/" + uid}
            className="sans-serif hover:cursor text-p-white hover:text-p-white mx-1 text-xs font-bold uppercase tracking-widest"
          >
            {userName}
          </Link>
          <span>
            <Image
              src={arrowDown}
              alt="arrow down indicator icon z-50"
              className="ml-1"
            />
          </span>
        </div>
        <ul
          className="bg-drop-grey text-drop-black z-50 rounded-sm"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <li className="divider"></li>
          <li>
            <Link
              className="sans-serif hover:bg-dd-blue hover:text-p-white z-50 block px-4 py-1 text-xs tracking-normal  hover:cursor-pointer"
              to={"/profile/" + uid}
            >
              Profile
            </Link>
          </li>
          {dropdownList.map((L) => (
            <li key={L.id}>
              <Link
                to={L.link}
                className="sans-serif hover:bg-dd-blue hover:text-p-white z-50 block px-4 py-1  text-xs  tracking-normal"
              >
                {L.name}
              </Link>
            </li>
          ))}
          <li className="divider">
            <Link
              to="/settings"
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
    </>
  );
};

export default DropdownDesktop;
