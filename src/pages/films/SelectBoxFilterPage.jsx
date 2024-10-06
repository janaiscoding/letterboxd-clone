import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrowDown from '../../components/UI_components/navbar_component_and_assets/navbar_assets/arrowdownprofile.png';
const SelectBoxFilterPage = ({ title, data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const onSelect = (i) => {
    navigate('/filter/' + i);
  };

  return (
    <div
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      className="m-2"
    >
      <div className="z-50 flex flex-col self-start rounded-sm pb-2 pt-2 hover:cursor-pointer">
        <div className="flex px-2 hover:text-p-white">
          <p className="sans-serif block text-xs uppercase tracking-normal text-sh-grey">
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

        {showDropdown ? (
          <ul className="absolute z-[9999] mt-5 rounded bg-drop-grey">
            {data.map((data, index) => {
              return (
                <li
                  className="sans-serif z-[9999] block px-4 py-1 text-xs tracking-normal hover:bg-dd-blue  hover:text-p-white"
                  onClick={() => onSelect(data)}
                  key={index}
                >
                  {data}
                </li>
              );
            })}
          </ul>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SelectBoxFilterPage;
