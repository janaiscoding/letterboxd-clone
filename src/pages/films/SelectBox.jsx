import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="z-50 flex flex-col self-start hover:cursor-pointer">
        <div
          onClick={toggleClick}
          className="sans-serif bg-c-grey text-p-white hover:text-p-white block flex self-center rounded p-1 px-4 text-xs font-bold uppercase tracking-normal"
        >
          <p>{title}</p>
          <span>
            <Image
              src={"arrowDown"}
              alt="arrow down indicator icon"
              className="ml-1"
            />
          </span>
        </div>
        <ul className={style}>
          {data.map((data, index) => {
            return (
              <li
                className="sans-serif bg-c-grey text-p-white hover:bg-dd-blue hover:text-p-white block self-center rounded p-1 px-4 text-xs font-bold uppercase  tracking-normal"
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
