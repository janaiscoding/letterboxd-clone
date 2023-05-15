import React from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";

const Dropdown = () => {
  const dropdownList = dropdownLinksData;

  return (
    <>
      <ul>
        {dropdownList.map((L) => (
          <li key={L.id}>
            <Link to={L.link}>{L.name} </Link>
          </li>
        ))}
        <p> separator </p>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </>
  );
};

export default Dropdown;
