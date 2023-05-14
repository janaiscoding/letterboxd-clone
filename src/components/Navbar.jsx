import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo-nav.png";
import "../styles/navbar.css";
import SignInAll from "./auth/SignInAll";
import HandleUser from "./auth/HandleUser";
import SearchInput from "./SearchInput";

const Navbar = ({ query, authStatus, handleSearchReq, onTestAccount }) => {
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
  return (
    <>
      <header className="flex">
        <div className="header-left flex">
          <Link
            to="/"
            className="logo"
            style={{ backgroundImage: `url(${logo})` }}
          ></Link>
          {/* <img src={logo} alt="Your SVG" /> */}
        </div>
        <div className="auth-navigation">
          {/* true means user is logged in, false means user needs to log in */}
          {authStatus ? <HandleUser /> : <SignInAll onTestAccount={onTestAccount} />}
        </div>
        <div className="search-navigation">
          <SearchInput 
          query={query}
          handleSearchReq={handleSearchReq} />
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
            <li className="active">
              <Link to="/films" className="cart-menu-icon">
                Films
              </Link>
            </li>
            <li className="active">
              <Link to="/lists" onClick={closeNav}>
                Lists
              </Link>
            </li>
            <li className="active">
              <Link to="/members" onClick={closeNav}>
                Members
              </Link>
            </li>
            <li className="active">
              <Link to="/journal" onClick={closeNav}>
                Journal
              </Link>
            </li>
            <li className="active search-icon">
              <Link to="/journal">Search</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
// change cart icon to display cuter stuff ? icons maybe ?
export default Navbar;
