import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import SignInAll from '../../auth/auth_methods/SignInAll';
import SearchInputMobile from './api_actions/SearchInputMobile';
import SearchInputDesktop from './api_actions/SearchInputDesktop';
import { auth } from '../../../firebase/firebase';
import navbarLinksData from './navbar_assets/navbarLinksData';

import logo from './navbar_assets/logo.png';
import logoMobile from './navbar_assets/logoMobile.png';
import openCloseMenu from './navbar_assets/menuopenclose.png';
import searchIcon from './navbar_assets/searchIcon.png';

import arrowDown from './navbar_assets/arrowdownprofile.png';
import DropdownDesktop from './DropdownDesktop';
import UserNavbar from './UserNavbar';
import DropdownMobile from './DropdownMobile';

const Navbar = ({
  query,
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

  // MOBILE HELPER FOR ACTIVE/INACTIVE
  const [searchMobOpen, setSearchMobOpen] = useState(false); //for searchbar mobile

  let searchBarRef = useRef();
  let dropDownRef = useRef();
  const [DDMobOpen, setDDMobOpen] = useState(false); //for dropdown mobile

  const displaySearchDesktop = () => {
    //show the bar element
    const SBD = document.querySelector('.search-bar-desktop');
    SBD.classList.remove('md:hidden');
    SBD.classList.add('md:block');

    // hide the icon
    const SIID = document.querySelector('.search-icon-desktop');
    SIID.classList.add('md:hidden');
    // show the x button
    const CSD = document.querySelector('.close-search-icon-desktop');
    CSD.classList.add('md:block');
    CSD.classList.remove('md:hidden');
  };

  useEffect(() => {
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
      <header
        className={`align-center flex flex-col md:h-[70px] md:flex-row ${
          isNavTransparent ? 'bg-transparent' : 'bg-h-blue'
        } ${
          DDMobOpen && !authStatus ? 'mb-28' : searchMobOpen ? 'mb-11' : 'mb-0'
        }
        ${
          DDMobOpen && authStatus ? 'mb-48' : searchMobOpen ? 'mb-12' : 'mb-0'
        }`}
      >
        <section className="align-center z-50 flex justify-between px-2 pl-4 md:mx-auto md:my-0 md:w-[950px]">
          <Link className="block self-center md:hidden" to="/">
            <img
              src={logoMobile}
              width={60}
              height={42}
              className="block md:hidden"
              alt="letterboxd mobile logo"
            />
          </Link>
          <Link className="hidden self-center md:block" to="/">
            <img
              src={logo}
              width={265}
              max-height={25}
              className="hidden md:block"
              alt="letterboxd browser logo"
            />
          </Link>
          <div className="flex items-center">
            <nav className="z-[1000] mt-4 flex flex-col self-start">
              <ul className="z-[1000] hidden  md:flex">
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
                    className="ml-4 items-center  self-center pt-2"
                    onClick={() => setShowLogin(true)}
                  >
                    <p className="sans-serif ml-4 text-xs font-bold uppercase tracking-widest text-sh-grey	hover:cursor-pointer hover:text-p-white">
                      {' '}
                      SIGN IN
                    </p>
                  </li>
                )}

                {navbarLinks.map((L) => (
                  <li className="ml-4 mt-2" key={L.id}>
                    <Link
                      className="sans-serif text-xs font-bold tracking-widest text-sh-grey hover:text-p-white"
                      to={L.link}
                    >
                      {L.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <img
              className="search-icon-desktop hidden hover:cursor-pointer md:ml-4 md:block"
              src={searchIcon}
              width={30}
              height={30}
              alt="search icon"
              onClick={displaySearchDesktop}
            />

            <div className="search-bar-desktop hidden md:hidden">
              <SearchInputDesktop
                query={query}
                fetchRequest={fetchRequest}
                setNewDataGained={setNewDataGained}
              />
            </div>
            {/* All mobile components are 
        1. Hidden from MD with Tailwind
        2. Toggled on/off with the icons 
        3. Handled when clicking outside of them with useRef and document event listeners for mousedown */}
            <div ref={dropDownRef}>
              <img
                onClick={() => setDDMobOpen(!DDMobOpen)}
                className="md:hidden"
                src={openCloseMenu}
                width={40}
                height={40}
                alt="open and close navbar dropdown menu on mobile"
              />
              <DropdownMobile
                profilePic={profilePic}
                userName={userName}
                arrowDown={arrowDown}
                userLogin={userLogin}
                authStatus={authStatus}
                setUserLogin={setUserLogin}
                DDMobOpen={DDMobOpen}
                setDDMobOpen={setDDMobOpen}
                dropDownRef={dropDownRef}
              />
            </div>

            <div ref={searchBarRef}>
              <img
                className="search-icon-mobile md:hidden"
                src={searchIcon}
                width={40}
                height={40}
                alt="search icon"
                onClick={() => {
                  setSearchMobOpen(!searchMobOpen);
                }}
              />
              <SearchInputMobile
                query={query}
                fetchRequest={fetchRequest}
                setNewDataGained={setNewDataGained}
                setSearchMobOpen={setSearchMobOpen}
                searchMobOpen={searchMobOpen}
                searchBarRef={searchBarRef}
              />
            </div>
          </div>
        </section>
      </header>
    </>
  );
};

export default Navbar;
