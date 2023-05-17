import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SignInAll from "../../auth/auth_methods/SignInAll";
import SearchInputMobile from "../../api_actions/SearchInputMobile";
import SearchInputDesktop from "../../api_actions/SearchInputDesktop";
import { auth } from "../../../firebase/firebase";
import navbarLinksData from "./navbar_assets/navbarLinksData";

import logo from "./navbar_assets/logo.png";
import logoMobile from "./navbar_assets/logoMobile.png";
import addNewIcon from "./navbar_assets/plusIcon.png";
import openCloseMenu from "./navbar_assets/menuopenclose.png";
import searchIcon from "./navbar_assets/searchIcon.png";
import myFace from "./navbar_assets/myface.jpg";
import arrowDown from "./navbar_assets/arrowdownprofile.png";
import DropdownDesktop from "./DropdownDesktop";
import UserNavbar from "./UserNavbar";
import DropdownMobile from "./DropdownMobile";

const NavbarSignout = ({
  query,
  apiKey,
  authStatus,
  fetchRequest,
  isProfileUpdated,
  setProfileUpdated,
}) => {
  const [userName, setUserName] = useState();
  const [profilePic, setProfilePic] = useState(myFace);

  //for hover on navbar
  const [visibility, setVisibility] = useState(false);
  // dropdown menu on mobile and visibility of search input on mobile
  const [visDDMob, setVisDDMob] = useState(false);
  const [visSIMob, setVisSIMob] = useState(false);
  //user handler
  const [userLogin, setUserLogin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navbarLinks = navbarLinksData;
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
    const BDI = document.querySelector(".backdrop-container");
    BDI.classList.contains("hidden")
      ? BDI.classList.remove("hidden")
      : BDI.classList.add("hidden");
    visDDMob ? setVisDDMob(false) : setVisDDMob(true);
  };
  const toggleLogin = () => {
    showLogin ? setShowLogin(false) : setShowLogin(true);
  };
  useEffect(() => {
    if (authStatus) {
      console.log(authStatus);
      setUserName(auth.currentUser.displayName);
      //i gotta update a placeholder user img for meow
      setProfilePic(auth.currentUser.photoURL);
      setUserLogin(true);
      setProfileUpdated(false);
      console.log('user is now logged in')
    } else {
      console.log('user is not logged in')
      setUserLogin(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <header className="flex flex-col align-center bg-transparent md:h-[70px] md:flex-row z-50">
        <section className="z-50 px-2 pl-4 bg-transparent flex justify-between align-center md:w-[950px] md:my-0 md:mx-auto">
          <Link className=" z-50 self-center" to="/">
            <img
              src={logoMobile}
              width={60}
              height={42}
              className="block z-index-10 md:hidden"
              alt="letterboxd mobile logo"
            />
            <img
              src={logo}
              width={265}
              max-height={25}
              className="hidden md:z-50 md:block"
              alt="letterboxd browser logo"
            />
          </Link>
          <div className="z-50  flex items-center">
            <nav className="flex flex-col self-start z-50 mt-4">
              <ul className="hidden md:flex">
                {userLogin ? (
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
                ) : showLogin ? (
                  <SignInAll setShowLogin={setShowLogin} />
                ) : (
                  <p
                    className="ml-4
                      pt-2  
                      text-base 
                      text-sh-grey 
                      font-semibold 
                      hover:text-p-white	
                      hover:cursor-pointer"
                    onClick={toggleLogin}
                  >
                    SIGN IN
                  </p>
                )}

                {navbarLinks.map((L) => (
                  <li
                    className="ml-4 text-base text-sh-grey font-semibold hover:text-p-white	pt-2"
                    key={L.id}
                  >
                    <Link to={L.link}>{L.name}</Link>
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
              width={40}
              height={40}
              alt="search icon"
              onClick={displaySearchDesktop}
            />
            <div className="search-bar-desktop hidden md:hidden z-50">
              <SearchInputDesktop
                apiKey={apiKey}
                query={query}
                fetchRequest={fetchRequest}
              />
            </div>
            <img
              className="search-icon-mobile md:hidden z-50"
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
          />
        ) : (
          " "
        )}
        {visDDMob ? (
          <div className="dropdown-mobile bg-h-blue z-50">
            <DropdownMobile
              profilePic={profilePic}
              userName={userName}
              arrowDown={arrowDown}
              setVisDDMob={setVisDDMob}
              userLogin={userLogin}
              authStatus={authStatus}
              toggleLogin={toggleLogin}
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

export default NavbarSignout;
