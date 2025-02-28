import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowDown from "../../components/UI_components/navbar_component_and_assets/navbar_assets/arrowdownprofile.png";
import Image from "next/image";
const SelectBoxFilterPage = ({ title, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const onSelect = (i) => {
    navigate("/filter/" + i);
  };

  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      className="m-2"
    >
      <div className="z-50 flex flex-col self-start rounded-sm pb-2 pt-2 hover:cursor-pointer">
        <div className="hover:text-p-white flex px-2">
          <p className="sans-serif text-sh-grey block text-xs uppercase tracking-normal">
            {title}
          </p>
          <span>
            <Image
              src={arrowDown}
              alt="arrow down indicator icon"
              className="ml-1"
            />
          </span>
        </div>

        {showDropdown ? (
          <ul className="bg-drop-grey absolute z-[9999] mt-5 rounded">
            {data.map((data, index) => {
              return (
                <li
                  className="sans-serif hover:bg-dd-blue hover:text-p-white z-[9999] block px-4 py-1 text-xs  tracking-normal"
                  onClick={() => onSelect(data)}
                  key={index}
                >
                  {data}
                </li>
              );
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectBoxFilterPage;
