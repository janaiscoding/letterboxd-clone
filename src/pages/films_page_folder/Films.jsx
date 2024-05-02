import React, { useEffect } from 'react';
import arrays from './filtering/arrays';
import PopularHome from '../home_page_folder/PopularHome';
import SelectBoxFilterPage from './SelectBoxFilterPage';

const Films = ({ fetchRequest, fetchResults, setNewDataGained }) => {
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBoxFilterPage
      title={element.type}
      data={element.array}
      key={index}
    />
  ));
  useEffect(() => {
    fetchRequest(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className="px-4 font-['Graphik'] md:mx-auto md:my-0 md:flex md:w-[950px] md:flex-col">
        <div className="mb-10 md:flex md:flex-row">
          <p className="sans-serif block self-center px-4 text-xs uppercase tracking-normal text-sh-grey md:px-0">
            Browse by:
          </p>
          <div className="grid grid-cols-2 md:flex md:flex-row">
            {allSelectionBoxes}
          </div>
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
