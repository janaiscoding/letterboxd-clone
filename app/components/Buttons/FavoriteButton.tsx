import React, { Dispatch, SetStateAction } from "react";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import favIcon from "./fav.png";
import removeFavIcon from "./remFav.png";
import Image from "next/image";
import { auth, db } from "../../firebase/firebase";
import { createFavouritePopup, PopupAction } from "../../utils";

export const FavouriteButton = ({
  id,
  title,
  isFavourite,
  setIsFavourite,
  onEvent,
}: {
  id: string;
  title: string;
  isFavourite: boolean;
  setIsFavourite: Dispatch<SetStateAction<boolean>>;
  onEvent?: () => void;
}) => {
  const onFavourite = async () => {
    onEvent && onEvent();

    if (isFavourite) {
      return await removeFromFavsDB();
    } else {
      return await addToFavsDB();
    }
  };

  const addToFavsDB = async () => {
    if (!auth || !auth.currentUser) {
      createFavouritePopup(title, PopupAction.ERROR);
      return;
    }

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favourites: arrayUnion({ movieID: id }),
    }).then(() => {
      setIsFavourite(true);
      createFavouritePopup(title, PopupAction.FAVOURITE);
    });
  };
  const removeFromFavsDB = async () => {
    if (!auth || !auth.currentUser) {
      createFavouritePopup(title, PopupAction.ERROR);
      return;
    }

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favourites: arrayRemove({ movieID: id }),
    }).then(() => {
      setIsFavourite(false);
      createFavouritePopup(title, PopupAction.REMOVED);
    });
  };

  return (
    <>
      <div className="p-2" onClick={onFavourite}>
        <Image
          src={isFavourite ? removeFavIcon : favIcon}
          width={20}
          height={20}
          alt={
            isFavourite
              ? "Remove movie from favorites icon"
              : "Add movie to favorites icon"
          }
          aria-label={
            isFavourite
              ? "Remove movie from favorites list"
              : "Add movie to favorites list"
          }
        />
      </div>
    </>
  );
};

export default FavouriteButton;
