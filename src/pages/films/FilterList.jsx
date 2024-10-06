import React, { useState, useEffect } from 'react';
import FilterComp from './FilterComp';

const FilterList = ({ fetchResults, setNewDataGained }) => {
  const [hasImageList, setHasImageList] = useState([]);
  useEffect(() => {
    if (fetchResults.results !== undefined) {
      const hasImageList = fetchResults.results.filter(
        (movie) => movie.poster_path !== null
      );
      setHasImageList(hasImageList);
    }
  }, [fetchResults]);

  return (
    <div>
      {hasImageList.length === 0
        ? 'no movies found for this filtered search'
        : hasImageList.map((movie) => (
            <FilterComp
              key={movie.id}
              movie={movie}
              setNewDataGained={setNewDataGained}
            />
          ))}
    </div>
  );
};

export default FilterList;
