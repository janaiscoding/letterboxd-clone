import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrowDown from "../../components/UI_components/navbar_component_and_assets/navbar_assets/arrowdownprofile.png";
const SelectBox = ({ title, data }) => {
  const [isClicked, setClicked] = useState(false);
  const [style, setStyle] = useState("hidden");
  const navigate = useNavigate();
  const onSelect = (i) => {
    navigate("/filter/" + i);
  };
  const toggleClick = () => {
    isClicked ? setClicked(false) : setClicked(true);
  };
  useEffect(() => {
    isClicked ? setStyle("block") : setStyle("hidden");
  }, [isClicked]);
  return (
    <div className="m-2">
      <div className="z-50 flex flex-col self-start rounded-sm bg-drop-grey pb-2 pt-2 hover:cursor-pointer">
        <div
          onClick={toggleClick}
          className="flex px-4 py-1 hover:text-p-white"
        >
          <p className="sans-serif block text-lg uppercase tracking-normal">
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
          {data.map((data, index) => {
            return (
              <li
                className="sans-serif z-50 block px-4 py-1 text-lg tracking-normal hover:bg-dd-blue  hover:text-p-white"
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

export default SelectBox;
