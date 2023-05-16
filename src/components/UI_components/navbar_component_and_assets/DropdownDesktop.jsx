import React from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import SignInAll from "../../auth/auth_methods/SignInAll";

const DropdownDesktop = ({ userName, profilePic, arrowDown, setVisibility }) => {
  const dropdownList = dropdownLinksData;

  return (
    <>
      <div
        className="rounded-sm pt-2 pb-2 bg-drop-grey flex flex-col self-start"
        onMouseLeave={() => setVisibility(false)}
      >
        <div className="mx-3 flex items-center">
          <img
            src={profilePic}
            alt={userName}
            width={24}
            height={24}
            className="rounded-xl"
          />
          <span className="text-base text-p-white font-semibold hover:cursor-pointer hover:text-p-white uppercase mx-1">
            {userName}
          </span>
          <span>
            <img src={arrowDown} alt="arrow down indicator icon" />
          </span>
        </div>
        <ul
          className="rounded-sm bg-drop-grey text-drop-black"
          onMouseLeave={() => setVisibility(false)}
        >
          <li className="divider"></li>
          {dropdownList.map((L) => (
            <li key={L.id}>
              <Link
                to={L.link}
                className=" block tracking-normal py-0.5 px-4 text-base hover:bg-dd-blue  hover:text-p-white"
              >
                {L.name}
              </Link>
            </li>
          ))}
          <li className="divider">
            <Link
              to="/settings"
              className="block py-0.5 px-4 text-base hover:bg-dd-blue  hover:text-p-white"
            >
              Settings
            </Link>
          </li>
          <li className="px-4 py-0.5 text-base hover:bg-dd-blue  hover:text-p-white hover:cursor-pointer">
            <SignOut />
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownDesktop;
