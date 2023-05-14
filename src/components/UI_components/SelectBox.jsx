import React from "react";
import { useNavigate } from "react-router-dom";

const SelectBox = ({ title, data }) => {
  const navigate = useNavigate();
  const onSelect = (i) => {
    console.log("selected", i);
    //redirect and pass data to fetcher
    console.log("redirecting to movie page followed by query");
    navigate("/films/" + i);
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
