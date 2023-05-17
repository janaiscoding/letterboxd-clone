import React, { useEffect, useState } from "react";
import PosterHomePopular from "./Poster_home_popular";
import "../../styles/poster.css";

const PopularHome = ({ populars, setNewDataGained }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    if (populars.results !== undefined) {
      const firstSix = populars.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }
  }, [populars]);

  return (
    <>
      <div
        className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
      >
        <a href="/popular" className="text-sm hover:text-hov-blue">
          POPULAR ON CLONNERBOXD
        </a>{" "}
        <a href="/popular" className="text-[11px] hover:text-hov-blue">
          MORE
        </a>
      </div>

      <div
        className="flex 
      flex-wrap 
      justify-between 
      md:flex-row 
      md:flex-nowrap
      mb-10"
      >
        {firstSix.length === 0
          ? "no populars available atm"
          : firstSix.map((movie) => (
              <PosterHomePopular
                key={movie.id}
                movie={movie}
                setNewDataGained={setNewDataGained}
              />
            ))}
      </div>
    </>
  );
};

export default PopularHome;
