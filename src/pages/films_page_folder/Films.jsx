import React from "react";
import SelectBox from "../../components/UI_components/SelectBox";
import arrays from "../../assets/filtering/arrays";

const Films = () => {
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBox
      title={element.type}
      data={element.array}
      key={index}
    />
  ));

  return (
    <>
      <div>Browse by:</div>
      {allSelectionBoxes}
    </>
  );
};

export default Films;
