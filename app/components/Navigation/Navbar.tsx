"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase/firebase";
import UserNavbar from "./UserNavbar";
import DropdownDesktop from "./DropdownDesktop";
import { AuthProviders } from "../Auth/AuthProviders";
import { SignInButton } from "../Buttons/SignInButton";
import { SearchInputDesktop } from "../Searching/SearchInputDesktop";
import { DropdownMobile } from "./DropdownMobile";
import { SearchInputMobile } from "../Searching/SearchInputMobile";

import openCloseMenu from "@/assets/menuopenclose.png";
import searchIcon from "@/assets/searchIcon.png";
import arrowDown from "@/assets/arrowdownprofile.png";
import logo from "@/assets/logo.png";
import logoMobile from "@/assets/logoMobile.png";
const menuLinks = [
  {
    id: 1,
    name: "FILMS",
    href: "/films",
  },
  // {
  //   id: 2,
  //   name: "LISTS",
  //   href: "/lists",
  // },
  {
    id: 3,
    name: "MEMBERS",
    href: "/members",
  },
  {
    id: 4,
    name: "REVIEWS",
    href: "/reviews",
  },
];

const Navbar = ({ userName, profilePic, isLoggedIn, isTransparentNav }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileSearchOpen, setisMobileSearchOpen] = useState(false);
  const [isMobileNavBarOpen, setisMobileNavBarOpen] = useState(false);

  // @to-do click outside on mobile
  // let dropDownRef: any = useRef();
  // let searchBarRef = useRef();

  // @to-do improve this
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
        isTransparentNav ? "bg-transparent" : "bg-navigation-bg"
      } ${
        isMobileNavBarOpen && !isLoggedIn
          ? "mb-28"
          : isMobileSearchOpen
          ? "mb-11"
          : "mb-0"
      }
        ${
          isMobileNavBarOpen && isLoggedIn
            ? "mb-48"
            : isMobileSearchOpen
            ? "mb-12"
            : "mb-0"
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

          {/* All mobile components are 1. Hidden from MD with Tailwind 2. Toggled on/off with the icons 
          3. Handled when clicking outside of them with useRef and document event listeners for mousedown */}

          <div className="md:hidden">
            <Image
              src={openCloseMenu}
              onClick={() => {
                setisMobileNavBarOpen(!isMobileNavBarOpen);
                setisMobileSearchOpen(false);
              }}
              width={40}
              height={40}
              alt="toggle mobile menu navigation"
            />
            {isMobileNavBarOpen && (
              <DropdownMobile userName={userName} profilePic={profilePic} />
            )}
          </div>

          <div>
            <Image
              className="search-icon-mobile md:hidden"
              src={searchIcon}
              width={40}
              height={40}
              alt="search icon"
              onClick={() => {
                setisMobileSearchOpen(!isMobileSearchOpen);
                setisMobileNavBarOpen(false);
              }}
            />
            {isMobileSearchOpen && <SearchInputMobile />}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Navbar;
