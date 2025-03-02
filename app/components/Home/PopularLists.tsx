import React from "react";
import { PopularListSet } from "./PopularListSet";

export const PopularLists = ({ movies }: { movies: any }) => {
  if (!movies) return null;

  return (
    <>
      <div className="section-heading border-b-grey text-sh-grey z-50 mb-3 flex justify-between border-b border-solid text-xs">
        <p className="hover:text-hov-blue text-sm hover:cursor-pointer">
          POPULAR LISTS
        </p>
        <p className="hover:text-hov-blue text-[11px] hover:cursor-pointer">
          MORE
        </p>
      </div>
      <div className="flex flex-col justify-between md:flex-row">
        <PopularListSet movies={movies.slice(0, 6)} start={1} end={6} />
        <PopularListSet movies={movies.slice(7, 13)} start={7} end={13} />
        <PopularListSet movies={movies.slice(14, 21)} start={14} end={20} />
      </div>
      <span className="mb-10"></span>
    </>
  );
};
