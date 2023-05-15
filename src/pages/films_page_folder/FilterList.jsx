import React, { useState, useEffect } from "react";
import Poster from "../../components/UI_components/Poster";

const FilterList = ({ fetchResults }) => {
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
    <>
      {hasImageList.length === 0
        ? "no movies found for this filtered search"
        : hasImageList.map((movie) => <Poster key={movie.id} movie={movie} />)}
    </>
  );
};

export default FilterList;
