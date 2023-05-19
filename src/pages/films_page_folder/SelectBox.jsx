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

export default SelectBox;
