"use client";
import React, { useState } from "react";
import Image from "next/image";
import { menuLinks } from "./NavigationLinks";
import Link from "next/link";
import { auth } from "../../../src/firebase/firebase";

//@todo move them in assets
import openCloseMenu from "../../../src/components/UI_components/navbar_component_and_assets/navbar_assets/menuopenclose.png";
import searchIcon from "../../../src/components/UI_components/navbar_component_and_assets/navbar_assets/searchIcon.png";
import arrowDown from "../../../src/components/UI_components/navbar_component_and_assets/navbar_assets/arrowdownprofile.png";
import logo from "../../../src/components/UI_components/navbar_component_and_assets/navbar_assets/logo.png";
import logoMobile from "../../../src/components/UI_components/navbar_component_and_assets/navbar_assets/logoMobile.png";
import UserNavbar from "./UserNavbar";
import DropdownDesktop from "./DropdownDesktop";
import { AuthProviders } from "../Auth/AuthProviders";
import { SignInButton } from "../Buttons/SignInButton";
import { SearchInputDesktop } from "../Searching/SearchInputDesktop";

const Navbar = ({ userName, profilePic, isLoggedIn, isTransparentNav }) => {
  const [showLogin, setShowLogin] = useState(false);

  //for hover on navbar to display dropdown menu on desktop
  const [showDropdown, setShowDropdown] = useState(false);

  // MOBILE HELPER FOR ACTIVE/INACTIVE
  const [searchMobOpen, setSearchMobOpen] = useState(false); //for searchbar mobile
  const [DDMobOpen, setDDMobOpen] = useState(false); //for dropdown mobile

  const displaySearchDesktop = () => {
    //show the bar element
    const SBD = document.querySelector(".search-bar-desktop");
    SBD?.classList.remove("md:hidden");
    SBD?.classList.add("md:block");

    // hide the icon
    const SIID = document.querySelector(".search-icon-desktop");
    SIID?.classList.add("md:hidden");
    // show the x button
    const CSD = document.querySelector(".close-search-icon-desktop");
    CSD?.classList.add("md:block");
    CSD?.classList.remove("md:hidden");
  };

  return (
    <header
      className={`align-center flex flex-col md:h-[60px] md:flex-row ${
        isTransparentNav ? "bg-transparent" : "bg-h-blue"
      } ${DDMobOpen && !isLoggedIn ? "mb-28" : searchMobOpen ? "mb-11" : "mb-0"}
        ${
          DDMobOpen && isLoggedIn ? "mb-48" : searchMobOpen ? "mb-12" : "mb-0"
        }`}
    >
      <section className="align-center z-10 flex justify-between px-2 pl-4 md:mx-auto md:my-0 md:w-[950px]">
        {/* Logo Mobile */}
        <Link className="block self-center md:hidden" href="/">
          <Image
            src={logoMobile}
            width={60}
            height={42}
            className="block md:hidden"
            alt="letterboxd mobile logo"
          />
        </Link>

        {/* Logo Desktop */}
        <Link className="hidden self-center md:block" href="/">
          <Image
            src={logo}
            width={200}
            height={25}
            className="hidden md:block"
            alt="clonnerboxd browser logo"
          />
        </Link>
        <div className="flex items-center">
          <nav className="z-20 mt-4 flex flex-col self-start">
            {/* Desktop Viewport */}
            <ul className="z-20 hidden md:flex">
              {/* Logged in, no hover */}
              {isLoggedIn && !showDropdown && (
                <li className="mt-[-3px]">
                  <UserNavbar
                    currentUserId={auth?.currentUser?.uid}
                    profilePic={profilePic}
                    userName={userName}
                    arrowDown={arrowDown}
                    setShowDropdown={setShowDropdown}
                  />
                </li>
              )}

              {/*Logged in, on hover */}
              {isLoggedIn && showDropdown && (
                <li className="mt-[-3px]">
                  <DropdownDesktop
                    currentUserId={auth?.currentUser?.uid}
                    profilePic={profilePic}
                    userName={userName}
                    arrowDown={arrowDown}
                    setShowDropdown={setShowDropdown}
                  />
                </li>
              )}

              {/*Not logged in, show login providers */}
              {!isLoggedIn && showLogin && <AuthProviders />}

              {/*Not logged in, show login button */}
              {!isLoggedIn && !showLogin && (
                <SignInButton onClick={() => setShowLogin(true)} />
              )}

              {menuLinks?.map((link) => (
                <li className="ml-4 mt-2" key={link.id}>
                  <Link
                    className="sans-serif text-sh-grey hover:text-p-white text-xs font-bold tracking-widest"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Image
            className="search-icon-desktop hidden hover:cursor-pointer md:ml-4 md:block"
            src={searchIcon}
            width={30}
            height={30}
            alt="search icon"
            onClick={displaySearchDesktop}
          />

          {/* Search Icon + bar + handle input on desktop */}
          <div className="search-bar-desktop hidden">
            <SearchInputDesktop />
          </div>

          {/* All mobile components are 
        1. Hidden from MD with Tailwind
        2. Toggled on/off with the icons 
        3. Handled when clicking outside of them with useRef and document event listeners for mousedown */}
          {/* <div ref={dropDownRef}>
              <Image
                src={openCloseMenu}
                onClick={() => setDDMobOpen(!DDMobOpen)}
                className="md:hidden"
                width={40}
                height={40}
                alt="open and close navbar dropdown menu on mobile"
              />
              <DropdownMobile
                profilePic={profilePic}
                userName={userName}
                arrowDown={arrowDown}
                authStatus={authStatus}
                setUserLogin={setIsLoggedIn}
                DDMobOpen={DDMobOpen}
                setDDMobOpen={setDDMobOpen}
                dropDownRef={dropDownRef}
              />
            </div>
            <div ref={searchBarRef}>
              <Image
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
                fetchRequest={fetchRequest}
                setNewDataGained={setNewDataGained}
                setSearchMobOpen={setSearchMobOpen}
                searchMobOpen={searchMobOpen}
                searchBarRef={searchBarRef}
              />
            </div> */}
        </div>
      </section>
    </header>
  );
};

export default Navbar;
