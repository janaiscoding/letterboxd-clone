import React, { useEffect, useState } from 'react';
import '../../styles/poster.css';
import PosterHomeLists from './Poster_home_lists';

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
        className="section-heading 
      z-50 
      mb-3 
      flex 
      justify-between
      border-b 
      border-solid 
      border-b-grey 
      text-xs
      text-sh-grey "
      >
        <p className="text-sm  hover:cursor-pointer hover:text-hov-blue">
          POPULAR LISTS
        </p>{' '}
        <p className="text-[11px] hover:cursor-pointer hover:text-hov-blue">
          MORE
        </p>
      </div>
      <div
        className="flex      
        flex-col
        justify-between
        md:flex-row"
      >
        <div>
          <div
            className="
      hover:border-3  
      flex
      w-fit
      overflow-hidden
      rounded
      border 
      border-solid 
      border-pb-grey/25 
      shadow-[0_0_1px_1px_rgba(20,24,28,1)]
      shadow-inner 
      hover:cursor-pointer   
      hover:rounded 
      hover:border-pb-grey 
      md:h-[105px] 
      md:w-[275px]
      "
          >
            {firstSix.length === 0
              ? ''
              : firstSix.map((movie, index) => (
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
                ))}
          </div>
          <p
            className="mt-1
            text-sm
            font-bold
            text-pb-grey 
            hover:cursor-pointer
            hover:text-sh-grey"
          >
            List of movies currently rank 1-6
          </p>
        </div>
        <div className="hidden md:block">
          <div
            className="
            hover:border-3  
            flex
            w-fit
            overflow-hidden
            rounded
            border 
            border-solid 
            border-pb-grey/25 
            shadow-[0_0_1px_1px_rgba(20,24,28,1)]
            shadow-inner 
            hover:cursor-pointer   
            hover:rounded 
            hover:border-pb-grey 
            md:h-[105px] 
            md:w-[275px]
            "
          >
            {nextSix.length === 0
              ? ''
              : nextSix.map((movie, index) => (
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
                ))}
          </div>
          <p
            className="mt-1
            text-sm
            font-bold
            text-pb-grey 
            hover:cursor-pointer
            hover:text-sh-grey"
          >
            List of movies currently rank 7-13
          </p>
        </div>
        <div className="hidden md:block">
          <div
            className="
          hover:border-3  
          flex
          w-fit
          overflow-hidden
          rounded
          border 
          border-solid 
          border-pb-grey/25 
          shadow-[0_0_1px_1px_rgba(20,24,28,1)]
          shadow-inner 
          hover:cursor-pointer   
          hover:rounded 
          hover:border-pb-grey 
          md:h-[105px] 
          md:w-[275px]
          "
          >
            {lastSix.length === 0
              ? ''
              : lastSix.map((movie, index) => (
                  <PosterHomeLists key={movie.id} movie={movie} index={index} />
                ))}
          </div>
          <p
            className="mt-1
            text-sm
            font-bold
            text-pb-grey 
            hover:cursor-pointer
            hover:text-sh-grey"
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
