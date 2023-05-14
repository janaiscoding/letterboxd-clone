import React from "react";

const SelectBox = ({ title, data }) => {
  const onSelect = (i) => {
    console.log("selected", i);
  };
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option>{title}</option>
      {data.map((data, index) => {
        return <option key={index}>{data}</option>;
      })}
    </select>
  );
};

export default SelectBox;
