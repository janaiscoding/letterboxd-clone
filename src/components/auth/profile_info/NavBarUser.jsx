import React from "react";

import SignOut from "../auth_methods/SignOut";
import { NavLink } from "react-router-dom";
import defaultProfileImg from "../../../assets/diary-icon.png";

// here i will have all those links
const NavBarUser = ({ userName }) => {
  return (
    <>
      <NavLink to="/profile">{userName}</NavLink>
      <img src={defaultProfileImg} alt="your user profile" width={30} />
      <SignOut />
    </>
  );
};

export default NavBarUser;
