/* eslint-disable react-hooks/exhaustive-deps */
import { User, UserFavourite } from "app/profile/User";
import React, { useEffect, useState } from "react";
import { ProfileMoviePoster } from "./ProfileMoviePoster";
import Link from "next/link";

export const ProfileMoviesHighlight = ({
  user,
  movies,
  type,
  onEvent,
}: {
  user: User;
  movies: UserFavourite[];
  type: string;
  onEvent: () => void;
}) => {
  const [movieIds, setMovieIds] = useState<string[]>([]);

  const getLatestMovies = (movies: UserFavourite[]) => {
    const latestMovies = movies.slice(0, 4).map((movie) => movie.movieID);
    setMovieIds(latestMovies);

    console.log("getLatestMovies, latestMovies: ", latestMovies);
  };

  useEffect(() => {
    if (movies) {
      getLatestMovies(movies);
    }
  }, [movies]);

  return (
    <>
      <Link
        href={"/profile/favourites/" + user.uid}
        className="align-start  section-heading  border-b-grey text-sh-grey  hover:text-hov-blue mb-2 flex  justify-between  border-b  border-solid text-xs md:min-w-[600px]"
      >
        <p>{type.toUpperCase()} FILMS</p>
        <p> SEE ALL</p>
      </Link>
      <div className="mb-5 flex flex-wrap gap-1 md:flex-row md:flex-nowrap">
        {movieIds.length === 0 && (
          <p className="text-sh-grey pt-2 text-base">
            This user has no {type} movies yet.
          </p>
        )}

        {movieIds.length > 0 &&
          movieIds.map((id) => (
            <ProfileMoviePoster
              key={id}
              user={user}
              movieId={id}
              onEvent={onEvent}
            />
          ))}
      </div>
    </>
  );
};
