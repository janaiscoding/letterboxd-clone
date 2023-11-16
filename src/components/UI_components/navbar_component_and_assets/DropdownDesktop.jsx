import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import { auth } from "../../../firebase/firebase";

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
        className="rounded-sm pt-2 pb-2 bg-drop-grey flex flex-col self-start z-50"
        onMouseLeave={() => setShowDropdown(false)}
      >
        <div className="flex items-center mx-1 z-50">
          <img
            src={profilePic}
            alt={userName}
            width={24}
            height={24}
            className="rounded-full z-50 max-h-[24px] max-w-[24px]"
          />
          <Link
            to={"/profile/" + uid}
            className="sans-serif text-xs text-p-white font-bold tracking-widest hover:text-p-white mx-1 uppercase hover:cursor"
          >
            {userName}
          </Link>
          <span>
            <img
              src={arrowDown}
              alt="arrow down indicator icon  z-50"
              className="ml-1"
            />
          </span>
        </div>
        <ul
          className="rounded-sm bg-drop-grey text-drop-black z-50"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <li className="divider"></li>
          <li>
            <Link
              className="sans-serif block tracking-normal py-1 px-4 text-xs hover:bg-dd-blue hover:cursor-pointer hover:text-p-white  z-50"
              to={"/profile/" + uid}
            >
              Profile
            </Link>
          </li>
          {dropdownList.map((L) => (
            <li key={L.id}>
              <Link
                to={L.link}
                className="sans-serif block tracking-normal py-1 px-4 text-xs hover:bg-dd-blue  hover:text-p-white  z-50"
              >
                {L.name}
              </Link>
            </li>
          ))}
          <li className="divider">
            <Link
              to="/settings"
              className="sans-serif block py-1 px-4 text-xs hover:bg-dd-blue  hover:text-p-white"
            >
              Settings
            </Link>
          </li>
          <li className="sans-serif px-4 py-1 text-xs hover:bg-dd-blue  hover:text-p-white hover:cursor-pointer">
            <SignOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownDesktop;
