import React, { useEffect, useState } from "react";
import MoviePanels from "./MoviePanels";

const MovieSynopsis = ({ movie }) => {
  const [movieYear, setMovieYear] = useState("");
  const [director, setDirector] = useState([]);
  const getDirector = () => {
    if (movie.credits !== undefined) {
      const crew = movie.credits.crew;
      const dir = crew.find(({ job }) => job === "Director");
      setDirector(dir.name);
    }
  };
  const getYear = () => {
    if (movie.release_date !== undefined) {
      setMovieYear(movie.release_date.substring(0, 4));
    }
  };
  useEffect(() => {
    getYear();
    getDirector();
    console.log(movie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return (
    <div className="flex flex-col md:pl-10 mt-[-10%] md:mt-0">
      <div className="flex gap-2 flex-wrap items-end">
        <p className="text-p-white font-bold text-4xl/[2.25rem] font-['Tiempos-Regular']">
          {movie.title}
        </p>
        <div className="flex gap-1 font-['Graphik']">
          <p className="text-p-white underline hover:cursor-pointer hover:text-hov-blue">
            {movieYear}
          </p>
          <p className="text-sh-grey">Directed by</p>
          <p className="text-p-white underline hover:cursor-pointer hover:text-hov-blue">
            {director}
          </p>
        </div>
      </div>
      <p className="py-3 text-sh-grey text-sm uppercase font-['Graphik']">
        {movie.tagline}
      </p>
      <p className="max-w-sm text-sm tracking-wide text-sh-grey font-['Tiempos-Light']">
        {movie.overview}
      </p>
      <MoviePanels movie={movie} />
    </div>
  );
};

export default MovieSynopsis;
