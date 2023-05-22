import React, { useEffect, useState } from "react";
import "../../styles/poster.css";
import PosterHomeLists from "./Poster_home_lists";

const PopularLists = ({ populars }) => {
  const [firstSix, setFirstSix] = useState([]);
  const [nextSix, setNextSix] = useState([]);
  const [lastSix, setLastSix] = useState([]);
  useEffect(() => {
    if (populars.results !== undefined) {
      const firstSix = populars.results.filter((movie, index) => index < 6);
      setFirstSix(firstSix);
      const nextSix = populars.results.filter(
        (movie, index) => index < 13 && index > 6
      );
      setNextSix(nextSix);
      const lastSix = populars.results.filter(
        (movie, index) => index < 20 && index > 13
      );
      setLastSix(lastSix);
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
      mb-3
      z-50 "
      >
        <p className="text-sm  hover:text-hov-blue hover:cursor-pointer">POPULAR LISTS</p>{" "}
        <p className="text-[11px] hover:text-hov-blue hover:cursor-pointer">MORE</p>
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
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
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
        <div>
          <div
            className="
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
          >
            {nextSix.length === 0
              ? ""
              : nextSix.map((movie, index) => (
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
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
            List of movies currently rank 7-13
          </p>
        </div>
        <div>
          <div
            className="
      md:w-fit  
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
            {lastSix.length === 0
              ? ""
              : lastSix.map((movie, index) => (
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
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
            List of movies currently rank 14-20
          </p>
        </div>
      </div>
      <span className="mb-10"></span>
    </>
  );
};

export default PopularLists;
