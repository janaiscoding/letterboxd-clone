import React, { useState, useEffect } from "react";
import Poster from "../../components/UI_components/Poster";

const FilterList = ({ filterResults }) => {
  const [limit, setLimit] = useState([]);
  useEffect(() => {
    if (filterResults.results !== undefined) {
      const limit = filterResults.results.filter((movie, index) => index < 20);
      setLimit(limit);
    }
  }, [filterResults]);
  console.log(limit)
  return (
    <>
      {limit.length === 0
        ? "no movies found for this filtered search"
        : limit.map((movie) => <Poster key={movie.id} movie={movie} />)}
    </>
  );
};

export default FilterList;
