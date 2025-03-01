import React from "react";
import { PopularMoviePoster } from "./PopularMoviePoster";

export const PopularMovies = ({ movies }: { movies: any }) => {
  return (
    <>
      <div className="section-heading border-b-grey text-sh-grey mb-3 flex justify-between border-b border-solid text-xs">
        <p className="hover:text-hov-blue text-sm hover:cursor-pointer">
          POPULAR ON CLONNERBOXD
        </p>{" "}
        <p className="hover:text-hov-blue text-[11px] hover:cursor-pointer">
          MORE
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-between md:flex-row md:flex-nowrap">
        {!movies &&
          "No populars available at the moment. Please try again later."}

        {movies &&
          movies
            .slice(0, 6)
            .map((movie) => (
              <PopularMoviePoster key={movie.id} movie={movie} />
            ))}
      </div>
    </>
  );
};
