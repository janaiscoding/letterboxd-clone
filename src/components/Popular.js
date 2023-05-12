import React, { useEffect, useState } from "react";
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
      My popular component
      {firstSix.length === 0
        ? "no populars"
        : firstSix.map((movie) => (
            <div key={movie.id}>
              <p>
                Movie Title: {movie.title} made in {movie.release_date}
              </p>
            </div>
          ))}
    </>
  );
};

export default Popular;
