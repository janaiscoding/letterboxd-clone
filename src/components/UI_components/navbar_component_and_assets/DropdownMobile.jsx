import React from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./navbar_assets/dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";
import "../../../styles/dropdown.css";
import navbarLinksData from "./navbar_assets/navbarLinksData";

const DropdownMobile = ({ userName, profilePic }) => {
  const dropdownList = dropdownLinksData;
  const navbarLinks = navbarLinksData;

  return (
    <>
      <div
        id="mobile-nav"
        className="rounded-sm p-2 bg-h-blue flex flex-col self-start"
      >
        <div className="flex items-center mx-1">
          <img
            src={profilePic}
            alt={userName}
            width={24}
            height={24}
            className="rounded-xl"
          />
          <span className=" text-p-white font-semibold hover:cursor-pointer hover:text-p-white uppercase mx-1">
            {userName}
          </span>
        </div>
        <ul className="rounded-sm text-base text-sh-grey bg-h-blue uppercase mx-3 py-3">
          <li className="divider-mobile"></li>
          <li className="py-3 grid grid-cols-2">
          {dropdownList.map((L) => (
            <p key={L.id} className="py-0.5 px-4">
              <Link to={L.link}>{L.name}</Link>
            </p>
          ))}
          </li>
          <li className="divider-mobile"></li>
          <li className="flex py-3">
            <Link to="/settings" className="block px-4">
              Settings
            </Link>

            <SignOut />

            <p className="block px-4 ">Subscriptions</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropdownMobile;
