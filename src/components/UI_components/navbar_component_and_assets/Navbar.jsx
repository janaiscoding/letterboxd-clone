import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo-nav.png";
// import "../../../styles/navbar.css";
import SignInAll from "../../auth/auth_methods/SignInAll";
import SearchInput from "../../api_actions/SearchInput";
import { auth } from "../../../firebase/firebase";
import NavBarUser from "./NavBarUser";
import navbarLinksData from "./navbarLinksData";

const Navbar = ({
  query,
  apiKey,
  authStatus,
  fetchRequest,
  isProfileUpdated,
  setProfileUpdated,
}) => {
  const [userName, setUserName] = useState();
  const navbarLinks = navbarLinksData;
  const toggleNav = () => {
    const primaryNav = document.querySelector(".primary-navigation");
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const visibility = primaryNav.getAttribute("data-visible");
    if (visibility === "false") {
      primaryNav.setAttribute("data-visible", true);
      navToggle.setAttribute("aria-expanded", true);
    } else {
      primaryNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  };
  const closeNav = () => {
    const primaryNav = document.querySelector(".primary-navigation");
    const navToggle = document.querySelector(".mobile-nav-toggle");
    const visibility = primaryNav.getAttribute("data-visible");
    if (visibility === "true") {
      primaryNav.setAttribute("data-visible", false);
      navToggle.setAttribute("aria-expanded", false);
    }
  };

  useEffect(() => {
    if (authStatus) {
      console.log(authStatus);
      setUserName(auth.currentUser.displayName);
      setProfileUpdated(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus, isProfileUpdated]);

  return (
    <>
      <header className="flex space-x-4 bg-h-blue text-l-white text-xl p-2 z-50">
        <div>
          <Link
            to="/"
          > 
          <img src={logo} alt="clonnerboxd logo"/>
           </Link>
          {/* <img src={logo} alt="Your SVG" /> */}
        </div>
        <div className="auth-navigation">
          {/* true means user is logged in, false means user needs to log in */}
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
      </header>
    </>
  );
};
// change cart icon to display cuter stuff ? icons maybe ?
export default Navbar;
