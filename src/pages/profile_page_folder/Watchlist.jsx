import React, { useEffect, useState } from "react";
import "../../styles/poster.css";
import PosterProfileLists from "./Poster_profile_lists";

const Watchlist = ({ apiKey, fetchResults, fetchRequest }) => {
  const [firstSix, setFirstSix] = useState([]);
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );

    if (fetchResults.results !== undefined) {
      const firstSix = fetchResults.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchResults]);

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
      mt-4
      mb-2
      z-50 "
      >
        <p
          className="text-sm  hover:text-hov-blue hover:cursor-pointer"
        >
          POPULAR LISTS
        </p>
      </div>
      <div
        className="flex 
        flex-col
        md:flex-row
      justify-between"
      >
        <div>
          <div
            className="
      w-fit  
      md:h-[105px]
      md:w-[275px]
      flex
      overflow-hidden
      border 
      border-solid 
      rounded 
      border-pb-grey/25
      shadow-inner 
      shadow-[0_0_1px_1px_rgba(20,24,28,1)]   
      hover:cursor-pointer 
      hover:border-3 
      hover:border-pb-grey 
      hover:rounded
      "
            style={{ zIndex: 15 }}
          >
            {firstSix.length === 0
              ? ""
              : firstSix.map((movie, index) => (
                  <PosterProfileLists
                    key={movie.id}
                    movie={movie}
                    index={index}
                  />
                ))}
          </div>
          <p
            className="text-pb-grey
            mt-1
            text-sm
            font-bold 
            hover:text-sh-grey
            hover:cursor-pointer"
          >
            List of movies currently rank 1-6
          </p>
        </div>
      </div>
    </>
  );
};

export default Watchlist;
