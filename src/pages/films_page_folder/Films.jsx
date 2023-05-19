import React from "react";
import SelectBox from "./SelectBox";
import arrays from "./filtering/arrays";
import SearchInputDesktop from "../../components/UI_components/navbar_component_and_assets/api_actions/SearchInputDesktop";

const Films = () => {
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBox title={element.type} data={element.array} key={index} />
  ));

  return (
    <div className="site-body py-5">
      <div className="grid grid-cols-2 md:flex md:flex-row px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        {allSelectionBoxes}
      </div>
      <div className="flex flex-col md:hidden items-center text-center mt-3">
        <p className="uppercase text-sh-grey font-['Graphik']">Find a film</p>
        <SearchInputDesktop />
      </div>
    </div>
  );
};

export default Films;
