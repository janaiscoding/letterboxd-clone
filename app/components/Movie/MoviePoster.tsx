import Image from "next/image";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { WatchButton } from "../Buttons/WatchButton";
import FavouriteButton from "../Buttons/FavoriteButton";

export default function MoviePoster({
  poster,
  id,
  title,
}: {
  poster: string;
  id: string;
  title: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  // @to-do create hook
  const [isFavourite, setIsFavourite] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const setIsMovieFavourite = async () => {
    if (!auth || !auth.currentUser) return;
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));

    const userFavs = userDoc?.data()?.favourites;
    const isFavorite = userFavs.some((movies) => movies?.movieID === id);
    setIsFavourite(isFavorite);
  };

  const setIsMovieWatched = async () => {
    if (!auth || !auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));

    const userWatched = userDoc?.data()?.watched;
    const isWatched = userWatched.some((movies) => movies?.movieID === id);
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
  }, [id, auth.currentUser]);
  return (
    <div
      className="group relative block hover:cursor-pointer hover:rounded hover:border-2 md:ml-1 md:self-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster Image */}
      <Image
        className="border-pb-grey/25 block h-40 w-28 rounded border border-solid shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner md:h-80 md:w-56"
        width={300}
        height={300}
        src={poster}
        alt={`Movie title for ${title}`}
      />

      {/* Conditionally visible on hover (for larger screens) */}
      {isHovered && (
        <div
          className="absolute left-[35%] top-[85%] z-10 hidden hidden items-center rounded p-0.5 md:flex "
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <FavouriteButton
            id={id}
            title={title}
            isFavourite={isFavourite}
            setIsFavourite={setIsFavourite}
          />
          <WatchButton
            id={id}
            title={title}
            isWatched={isWatched}
            setIsWatched={setIsWatched}
          />
        </div>
      )}

      {/* Always visible on mobile, hidden on larger screens */}
      <div
        className="absolute left-[5%] top-[70%] z-10 flex items-center rounded p-0.5 md:hidden"
        style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      >
        <FavouriteButton
          id={id}
          title={title}
          isFavourite={isFavourite}
          setIsFavourite={setIsFavourite}
        />

        <WatchButton
          id={id}
          title={title}
          isWatched={isWatched}
          setIsWatched={setIsWatched}
        />
      </div>
    </div>
  );
}
