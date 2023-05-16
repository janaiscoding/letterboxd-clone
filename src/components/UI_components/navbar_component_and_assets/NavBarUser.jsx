import React, { useState } from "react";
import { Link } from "react-router-dom";
import defaultProfileImg from "../../../assets/diary-icon.png";
import Dropdown from "./DropdownDesktop";

// here i will have all those links
const NavBarUser = ({ userName }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="flex h-1"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Link to="/profile">{userName}</Link>
      <img src={defaultProfileImg} alt="your user profile" />
      <div>tiny arrow</div>
      <div>
      {visible ? <Dropdown setVisible={setVisible}/> : ""}
      </div>
    </div>
  );
};

export default NavBarUser;
