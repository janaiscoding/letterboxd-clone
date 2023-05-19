import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SignInAll from "../../auth/auth_methods/SignInAll";
import SearchInputMobile from "./api_actions/SearchInputMobile";
import SearchInputDesktop from "./api_actions/SearchInputDesktop";
import { auth } from "../../../firebase/firebase";
import navbarLinksData from "./navbar_assets/navbarLinksData";

import logo from "./navbar_assets/logo.png";
import logoMobile from "./navbar_assets/logoMobile.png";
import addNewIcon from "./navbar_assets/plusIcon.png";
import openCloseMenu from "./navbar_assets/menuopenclose.png";
import searchIcon from "./navbar_assets/searchIcon.png";

import arrowDown from "./navbar_assets/arrowdownprofile.png";
import DropdownDesktop from "./DropdownDesktop";
import UserNavbar from "./UserNavbar";
import DropdownMobile from "./DropdownMobile";

const Navbar = ({
  query,
  apiKey,
  authStatus,
  fetchRequest,
  isProfileUpdated,
  setProfileUpdated,
  isNavTransparent,
  setNavTransparent,
  setNewDataGained,
}) => {
  const navbarLinks = navbarLinksData;
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState();

  //this handles the login/logout styles and displays in the navbar
  const [userLogin, setUserLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  //for hover on navbar to display dropdown menu on desktop
  const [showDropdown, setShowDropdown] = useState(false);
  // dropdown menu on mobile and visibility of search input on mobile
  const [visDDMob, setVisDDMob] = useState(false);
  const [visSIMob, setVisSIMob] = useState(false);
  //style for online/offline
  const [style, setStyle] = useState();

  const handleVisSIMob = () => {
    visSIMob ? setVisSIMob(false) : setVisSIMob(true);
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

  const handleVisDDMob = () => {
    visDDMob ? setVisDDMob(false) : setVisDDMob(true);
  };

  useEffect(() => {
    isNavTransparent
      ? setStyle(
          "flex flex-col align-center bg-transparent md:h-[70px] md:flex-row"
        )
      : setStyle(
          "flex flex-col align-center bg-h-blue md:h-[70px] md:flex-row"
        );
    console.log("useeff in nav");
    if (authStatus) {
      setUserName(auth.currentUser.displayName);
      setProfilePic(auth.currentUser.photoURL);
      setUserLogin(true);
      setProfileUpdated(false);

      setNavTransparent(false);
    } else {
      setUserLogin(false);
      setNavTransparent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isNavTransparent, isProfileUpdated]);

  return (
    <>
      <header className={style}>
        <section className="px-2 pl-4 flex justify-between align-center md:w-[950px] md:my-0 md:mx-auto z-50">
          <Link className="self-center block md:hidden" exact to="/">
            <img
              src={logoMobile}
              width={60}
              height={42}
              className="block md:hidden"
              alt="letterboxd mobile logo"
            />
          </Link>
          <Link className="self-center hidden md:block" exact to="/">
            <img
              src={logo}
              width={265}
              max-height={25}
              className="hidden md:block"
              alt="letterboxd browser logo"
            />
          </Link>
          <div className="flex items-center">
            <nav className="flex flex-col self-start z-[1000] mt-4">
              <ul className="hidden md:flex  z-[1000]">
                {/* if user if logged in, i show the dropdown/normal user UI */}
                {userLogin ? (
                  <li>
                    {showDropdown ? (
                      <DropdownDesktop
                        authStatus={authStatus}
                        profilePic={profilePic}
                        userName={userName}
                        arrowDown={arrowDown}
                        setShowDropdown={setShowDropdown}
                      />
                    ) : (
                      <UserNavbar
                        authStatus={authStatus}
                        profilePic={profilePic}
                        userName={userName}
                        arrowDown={arrowDown}
                        setShowDropdown={setShowDropdown}
                      />
                    )}
                  </li>
                ) : showLogin ? (
                  // if user is not logged in, I display a toggle for the sign in options
                  //show login = true when clicked on "SIGN IN"
                  <SignInAll />
                ) : (
                  <li
                    className="ml-4 pt-2  self-center items-center"
                    onClick={() => setShowLogin(true)}
                  >
                    <p className="ml-4 sans-serif text-xs text-sh-grey font-bold tracking-widest hover:text-p-white	hover:cursor-pointer uppercase">
                      {" "}
                      SIGN IN
                    </p>
                  </li>
                )}

                {navbarLinks.map((L) => (
                  <li className="ml-4 mt-2" key={L.id}>
                    <Link
                      className="sans-serif text-xs text-sh-grey font-bold tracking-widest hover:text-p-white"
                      to={L.link}
                    >
                      {L.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <img
              className="md:hidden"
              src={addNewIcon}
              width={40}
              height={40}
              alt="search for a new movie to add"
              onClick={handleVisSIMob}
            />
            <img
              onClick={handleVisDDMob}
              className="md:hidden"
              src={openCloseMenu}
              width={40}
              height={40}
              alt="open and close navbar menu"
            />
            <img
              className="search-icon-desktop hidden hover:cursor-pointer md:block md:ml-4"
              src={searchIcon}
              width={30}
              height={30}
              alt="search icon"
              onClick={displaySearchDesktop}
            />
            <div className="search-bar-desktop hidden md:hidden">
              <SearchInputDesktop
                apiKey={apiKey}
                query={query}
                fetchRequest={fetchRequest}
                setNewDataGained={setNewDataGained}
              />
            </div>

            <img
              className="search-icon-mobile md:hidden"
              src={searchIcon}
              width={40}
              height={40}
              alt="search icon"
              onClick={handleVisSIMob}
            />
          </div>
        </section>
        {visSIMob ? (
          <SearchInputMobile
            apiKey={apiKey}
            query={query}
            fetchRequest={fetchRequest}
            handleVisSIMob={handleVisSIMob}
            setNewDataGained={setNewDataGained}
          />
        ) : (
          " "
        )}
        {visDDMob ? (
          <div className="dropdown-mobile bg-h-blue">
            <DropdownMobile
              profilePic={profilePic}
              userName={userName}
              arrowDown={arrowDown}
              setVisDDMob={setVisDDMob}
              userLogin={userLogin}
              authStatus={authStatus}
              setUserLogin={setUserLogin}
            />
          </div>
        ) : (
          ""
        )}
      </header>
    </>
  );
};

export default Navbar;
