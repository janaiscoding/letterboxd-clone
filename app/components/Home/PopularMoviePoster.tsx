import React, { useEffect, useState } from "react";

import Image from "next/image";
import FavouriteButton from "../Buttons/FavoriteButton";
import { WatchButton } from "../Buttons/WatchButton";
import Link from "next/link";
import { auth, db } from "app/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const PopularMoviePoster = ({
  movie,
  compact = false,
}: {
  movie: any;
  compact?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // @to-do create hook
  const [isFavourite, setIsFavourite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const setIsMovieFavourite = async () => {
    if (!auth || !auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));

    const userFavs = userDoc?.data()?.favourites;
    const isFavorite = userFavs.some((movies) => movies?.movieID === movie.id);
    setIsFavourite(isFavorite);
  };

  const setIsMovieWatched = async () => {
    if (!auth || !auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));

    const userWatched = userDoc?.data()?.watched;
    const isWatched = userWatched.some(
      (movies) => movies?.movieID === movie.id
    );
    setIsWatched(isWatched);
  };

  const setInitialMovieStatuses = () => {
    setIsMovieFavourite();
    setIsMovieWatched();
  };

  useEffect(() => {
    if (auth && auth.currentUser) {
      setInitialMovieStatuses();
    }
  }, [movie, auth.currentUser]);

  return (
    <div
      className={
        compact
          ? "w-[32.33%]"
          : "" +
            `hover:border-3 border-pb-grey/25 hover:border-pb-grey relative mb-[2%] rounded border border-solid shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner hover:cursor-pointer hover:rounded md:ml-1`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      key={movie.id}
    >
      <Link href={"/movie/" + movie.id}>
        <Image
          width={300}
          height={300}
          className="block rounded border"
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
      {isHovered && (
        <div
          className="absolute left-[25%] top-[80%] z-10 flex items-center rounded p-0.5"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <FavouriteButton
            id={movie.id}
            title={movie.title}
            isFavourite={isFavourite}
            setIsFavourite={setIsFavourite}
          />
          <WatchButton
            id={movie.id}
            title={movie.title}
            isWatched={isWatched}
            setIsWatched={setIsWatched}
          />
        </div>
      )}
    </div>
  );
};
