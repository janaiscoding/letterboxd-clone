/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { ProfileMoviePoster } from "./ProfileMoviePoster";
import Link from "next/link";
import { User, UserFavourite, UserWatched } from "app/types";

export const ProfileMoviesHighlight = ({
  user,
  movies,
  watched,
  favourites,
  type,
  onEvent,
}: {
  user: User;
  movies: UserFavourite[];
  watched: UserWatched[];
  favourites: UserFavourite[];
  type: string;
  onEvent: () => void;
}) => {
  const [movieIds, setMovieIds] = useState<string[]>([]);

  const getLatestMovies = (movies: UserFavourite[]) => {
    const latestMovies = movies.slice(0, 4).map((movie) => movie.movieID);

    setMovieIds(latestMovies);
  };

  useEffect(() => {
    if (movies) {
      getLatestMovies(movies);
    }
  }, [movies]);

  return (
    <>
      <div className="align-start section-heading border-b-grey text-sh-grey  mb-2 flex  justify-between  border-b  border-solid text-xs md:min-w-[600px]">
        <p>{type.toUpperCase()} FILMS</p>
        <p> SEE ALL</p>
      </div>
      <div className="mb-5 flex flex-wrap gap-1 md:flex-row">
        {movieIds.length === 0 && (
          <p className="text-sh-grey pt-2 text-base">
            This user has no {type} movies yet.
          </p>
        )}

        {movieIds.length > 0 &&
          movieIds.map((id) => (
            <ProfileMoviePoster
              key={id}
              watched={watched}
              favourites={favourites}
              movieId={id}
              onEvent={onEvent}
            />
          ))}
      </div>
    </>
  );
};
