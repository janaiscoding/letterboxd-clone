import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./DropdownDesktop";

// here i will have all those links
const NavBarUser = ({ profilePic, userName }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="flex h-1"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Link to="/profile">{userName}</Link>
      <img src={profilePic} alt="your user profile" />
      <div>tiny arrow</div>
      <div>
      {visible ? <Dropdown setVisible={setVisible}/> : ""}
      </div>
    </div>
  );
};

export default NavBarUser;
