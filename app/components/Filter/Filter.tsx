import React, { useState } from "react";
import Image from "next/image";
import arrowDown from "@/assets/arrowdownprofile.png";

export const Filter = ({
  title,
  values,
  currentValues,
  onSelect,
}: {
  title: string;
  values: string[];
  currentValues: string[];
  onSelect: (value: string, title: string) => void;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (value: string) => {
    setShowDropdown(false);
    onSelect(value, title);
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
            {values.map((value) => {
              const fl = currentValues.includes(value);
              return (
                <li
                  className={`sans-serif z-[9999] block px-4 py-1 text-xs tracking-normal
                  ${fl?"bg-dd-blue text-p-white":"hover:bg-dd-blue hover:text-p-white"
                  }`}
                  onClick={() => handleSelect(value)}
                  key={`${title}-${value}`}
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
