import React from "react";
import { Link } from "react-router-dom";
import dropdownLinksData from "./dropdownLinksData";
import SignOut from "../../auth/auth_methods/SignOut";

const Dropdown = ({setVisible}) => {
  const dropdownList = dropdownLinksData;

  return (
    <>
    <div onMouseEnter={()=>setVisible(true)}>
      <ul className="bg-drop-grey text-drop-black z-50">
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
      </div>
    </>
  );
};

export default Dropdown;
