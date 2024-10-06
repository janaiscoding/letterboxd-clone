import React, { useEffect, useState } from 'react';
import MoviePanels from './MoviePanels';
import RecentReviewsMovie from './RecentReviewsMovie';

const MovieSynopsis = ({ movie, authStatus }) => {
  const [movieYear, setMovieYear] = useState('');
  const [director, setDirector] = useState([]);
  const getDirector = () => {
    if (movie.credits !== undefined) {
      const crew = movie.credits.crew;
      const dir = crew.find(({ job }) => job === 'Director');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return (
    <div className="flex flex-col md:pl-10 ">
      <div className="flex flex-wrap items-end gap-2">
        <p className="font-['Tiempos-Regular'] text-4xl/[2.25rem] font-bold text-p-white">
          {movie.title}
        </p>
        <div className="flex gap-1 font-['Graphik']">
          <p className="text-p-white underline">{movieYear}</p>
          <p className="text-sh-grey">Directed by</p>
          <p className="text-p-white underline">{director}</p>
        </div>
      </div>
      <div className="md:w-[390px]">
        <p className="py-3 font-['Graphik'] text-sm uppercase text-sh-grey">
          {movie.tagline}
        </p>
        <p className="mb-3 max-w-sm font-['Tiempos-Light'] text-sm tracking-wide text-sh-grey">
          {movie.overview}
        </p>
        <MoviePanels movie={movie} />
        <RecentReviewsMovie movie={movie} authStatus={authStatus} />
      </div>
    </div>
  );
};

export default MovieSynopsis;
