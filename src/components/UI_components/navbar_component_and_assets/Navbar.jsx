import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SignInAll from "../../auth/auth_methods/SignInAll";
import SearchInputMobile from "../../api_actions/SearchInputMobile";
import SearchInputDesktop from "../../api_actions/SearchInputDesktop";
import { auth } from "../../../firebase/firebase";
import NavBarUser from "./NavBarUser";
import navbarLinksData from "./navbar_assets/navbarLinksData";

import logo from "./navbar_assets/logo.png";
import logoMobile from "./navbar_assets/logoMobile.png";
import addNewIcon from "./navbar_assets/plusIcon.png";
import openCloseMenu from "./navbar_assets/menuopenclose.png";
import searchIcon from "./navbar_assets/searchIcon.png";
import SignOut from "../../auth/auth_methods/SignOut";
import myFace from "./navbar_assets/myface.jpg";
import arrowDown from "./navbar_assets/arrowdownprofile.png";
import DropdownDesktop from "./DropdownDesktop";
import UserNavbar from "./UserNavbar";
import { doc } from "firebase/firestore";

const Navbar = ({
  query,
  apiKey,
  authStatus,
  fetchRequest,
  isProfileUpdated,
  setProfileUpdated,
}) => {
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState(myFace);
  const [visibility, setVisibility] = useState(false);

  const navbarLinks = navbarLinksData;
  const displaySearchBar = () => {
    const SIM = document.querySelector(".search-bar-mobile");
    SIM.classList.contains("hidden")
      ? SIM.classList.remove("hidden")
      : SIM.classList.add("hidden");
  };
  const displaySearchDesktop = () => {
    //show the bar element

    const SBD = document.querySelector(".search-bar-desktop");
    SBD.classList.remove("md:hidden");
    SBD.classList.add("md:block");

    // hide the icon
    const SIID = document.querySelector(".search-icon-desktop");
    SIID.classList.add("md:hidden");
    // show the x button
    const CSD = document.querySelector(".close-search-icon-desktop");
    CSD.classList.add("md:block");
    CSD.classList.remove("md:hidden");
  };

  useEffect(() => {
    if (authStatus) {
      console.log(authStatus);
      setUserName(auth.currentUser.displayName);
      //i gotta update a placeholder user img for meow
      setProfilePic(auth.currentUser.photoURL);
      setProfileUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <header className="flex flex-col align-center bg-h-blue px-2 md:h-[70px] md:flex-row">
        <section className=" flex justify-between align-center md:w-[950px] md:my-0 md:mx-auto">
          <Link className="self-center" to="/">
            <img
              src={logoMobile}
              width={60}
              height={42}
              className="block md:hidden"
              alt="letterboxd mobile logo"
            />
            <img
              src={logo}
              width={265}
              max-height={25}
              className="hidden md:block"
              alt="letterboxd browser logo"
            />
          </Link>
          <div className="flex items-center">
            <nav className="flex flex-col self-start z-50 mt-4">
              <ul className="hidden md:flex">
                <li>
                  {visibility ? (
                    <DropdownDesktop
                      profilePic={profilePic}
                      userName={userName}
                      arrowDown={arrowDown}
                      setVisibility={setVisibility}
                    />
                  ) : (
                    <UserNavbar
                      profilePic={profilePic}
                      userName={userName}
                      arrowDown={arrowDown}
                      setVisibility={setVisibility}
                    />
                  )}
                </li>
                {navbarLinks.map((link) => (
                  <li
                    className="ml-4 text-base text-sh-grey font-semibold hover:text-p-white	pt-2"
                    key={link.id}
                  >
                    <Link to={link.link}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <img
              className="md:hidden"
              src={addNewIcon}
              width={40}
              height={40}
              alt="decorative plus icon"
            />
            <img
              className="md:hidden"
              src={openCloseMenu}
              width={40}
              height={40}
              alt="open and close navbar menu"
            />
            <img
              className="search-icon-desktop hidden hover:cursor-pointer md:block md:ml-4"
              src={searchIcon}
              width={40}
              height={40}
              alt="search icon"
              onClick={displaySearchDesktop}
            />
            <div className="search-bar-desktop bg-h-blue hidden md:hidden">
              <SearchInputDesktop
                profilePic={profilePic}
                apiKey={apiKey}
                query={query}
                fetchRequest={fetchRequest}
              />
            </div>

            <img
              className="search-icon-mobile md:hidden"
              src={searchIcon}
              width={40}
              height={40}
              alt="search icon"
              onClick={displaySearchBar}
            />
          </div>
        </section>
        <div className="search-bar-mobile bg-h-blue hidden">
          <SearchInputMobile
            apiKey={apiKey}
            query={query}
            fetchRequest={fetchRequest}
          />
        </div>
      </header>
      {/* <header className="flex space-x-4 bg-h-blue text-l-white text-xl p-2 w-10 lg:w-auto">
        <div className="">
          <Link
            to="/"
          > 
          <img src={logo} alt="clonnerboxd logo"/>
           </Link>
        </div>
        <div className="auth-navigation">
          {authStatus ? <NavBarUser userName={userName} /> : <SignInAll />}
        </div>
        <div className="search-navigation">
          <SearchInput
            apiKey={apiKey}
            query={query}
            fetchRequest={fetchRequest}
          />
        </div>
        <button
          className="mobile-nav-toggle"
          aria-controls="primary-navigation"
          aria-expanded="false"
          onClick={toggleNav}
        ></button>
        <nav>
          <ul
            id="primary-navigation"
            className="primary-navigation flex"
            data-visible="false"
          >
            {navbarLinks.map((link) => (
              <li className="active" key={link.id}>
                <Link to={link.link} onClick={closeNav}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>  */}
    </>
  );
};
// change cart icon to display cuter stuff ? icons maybe ?
export default Navbar;
