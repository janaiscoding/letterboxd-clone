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
      <div className="flex justify-between section-heading text-sh-grey text-sm border-b border-solid border-b-grey mb-3 ">
        <a href="/popular" className="text-base/[13px]  hover:text-hov-blue">
          POPULAR ON CLONNERBOXD
        </a>{" "}
        <a href="/popular" className="text-[11px] hover:text-hov-blue">
          MORE
        </a>
      </div>

      <div className="flex flex-col md:flex-row">
        {firstSix.length === 0
          ? "no populars"
          : firstSix.map((movie) => (
              <PosterHomePopular key={movie.id} movie={movie} />
            ))}
      </div>
    </>
  );
};

export default PopularHome;
