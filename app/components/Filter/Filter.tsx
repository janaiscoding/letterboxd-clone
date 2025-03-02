import React, { useState } from "react";
import Image from "next/image";
import arrowDown from "@/assets/arrowdownprofile.png";

export const Filter = ({
  title,
  values,
  onSelect,
}: {
  title: string;
  values: string[];
  onSelect: (value: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value: string) => {
    setShowDropdown(false);
    onSelect(value);
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
              width={6}
              height={10}
              alt="arrow down indicator icon"
              className="ml-1"
            />
          </span>
        </div>

        {showDropdown && (
          <ul className="bg-drop-grey absolute z-[9999] mt-5 rounded">
            {values.map((value, i) => {
              return (
                <li
                  className="sans-serif hover:bg-dd-blue hover:text-p-white z-[9999] block px-4 py-1 text-xs tracking-normal"
                  onClick={() => handleSelect(value)}
                  key={i}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
