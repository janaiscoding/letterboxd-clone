import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultProfileImg from "../../../assets/diary-icon.png";
import Dropdown from "./Dropdown";

// here i will have all those links
const NavBarUser = ({ userName }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="user-navbar-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Link to="/profile">{userName}</Link>
      <img src={defaultProfileImg} alt="your user profile" width={30} />
      {visible ? <Dropdown /> : ""}
      <div>tiny arrow</div>
    </div>
  );
};

export default NavBarUser;
