import React, { useEffect } from "react";
import arrays from "./filtering/arrays";
import SearchInputDesktop from "../../components/UI_components/navbar_component_and_assets/api_actions/SearchInputDesktop";
import PopularHome from "../home_page_folder/PopularHome";
import SelectBoxFilterPage from "./SelectBoxFilterPage";

const Films = ({ apiKey, fetchRequest, fetchResults, setNewDataGained }) => {
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBoxFilterPage
      title={element.type}
      data={element.array}
      key={index}
    />
  ));
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="site-body py-5 min-h-[80vh]">
      <div className="md:flex md:flex-col px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div className="md:flex md:flex-row">
          <p className="sans-serif block tracking-normal text-xs uppercase px-4 text-sh-grey self-center">
            Browse by:
          </p>
          {allSelectionBoxes}
        </div>
        <div className="flex flex-col md:hidden items-center text-center my-3">
          <p className="uppercase text-sh-grey font-['Graphik']">Find a film</p>
          <SearchInputDesktop />
        </div>
        <PopularHome
          populars={fetchResults}
          setNewDataGained={setNewDataGained}
        />
      </div>
    </div>
  );
};

export default Films;
