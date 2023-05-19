import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowDown from "../../components/UI_components/navbar_component_and_assets/navbar_assets/arrowdownprofile.png";
const SelectBoxFilterPage = ({ title, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const onSelect = (i) => {
    console.log("selected", i);

    //redirect and pass data to fetcher
    console.log("redirecting to movie page followed by query");
    navigate("/filter/" + i);
  };

  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      className="m-2"
    >
      <div className="rounded-sm pt-2 pb-2 bg-drop-grey flex flex-col self-start z-50 hover:cursor-pointer">
        <div
          onClick={toggleClick}
          className="flex py-1 px-4 hover:text-p-white"
        >
          <p className="sans-serif block tracking-normal text-xs uppercase">
            {title}
          </p>
          <span>
            <img
              src={arrowDown}
              alt="arrow down indicator icon"
              className="ml-1"
            />
          </span>
        </div>

        <ul className={style}>
        {
            showDropdown ? : ""
        }
          {data.map((data, index) => {
            return (
              <li
                className="sans-serif block tracking-normal py-1 px-4 text-xs hover:bg-dd-blue hover:text-p-white  z-50"
                onClick={() => onSelect(data)}
                key={index}
              >
                {data}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default SelectBoxFilterPage;
