import React, { useEffect, useState } from "react";
import PosterHomePopular from "./Poster_home_popular";

const PopularHome = ({ populars }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (populars.results !== undefined) {
      const firstSix = populars.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }
  }, [populars]);

  return (
    <>
      <div>POPULAR ON CLONNERBOXD</div>
      {firstSix.length === 0
        ? "no populars"
        : firstSix.map((movie) => <PosterHomePopular key={movie.id} movie={movie} />)}
    </>
  );
};

export default PopularHome;
