import React, { useEffect, useState } from "react";
import Poster from "./UI_components/Poster";

const Popular = ({ populars }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (populars.results !== undefined) {
      const firstSix = populars.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }
    console.log(`in popular`, populars);
  }, [populars]);

  return (
    <>
      {firstSix.length === 0
        ? "no populars"
        : firstSix.map((movie) => <Poster key={movie.id} movie={movie} />)}
    </>
  );
};

export default Popular;
