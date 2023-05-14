import React, { useEffect, useState } from "react";
import Poster from "./UI_components/Poster";

const Popular = ({ popular }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (popular.results !== undefined) {
      const firstSix = popular.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }
  }, [popular]);

  return (
    <>
      {firstSix.length === 0
        ? "no populars"
        : firstSix.map((movie) => <Poster key={movie.id} movie={movie} />)}
    </>
  );
};

export default Popular;
