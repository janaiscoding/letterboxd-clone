/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch } from "react";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import watchIcon from "./watched.png";
import remWatched from "./remWatched.png";
import Image from "next/image";
import { auth, db } from "../../firebase/firebase";
import { createWatchedPopup, PopupAction } from "../../utils";

export const WatchButton = ({
  id,
  title,
  isWatched,
  setIsWatched,
  onEvent,
}: {
  id: string;
  title: string;
  isWatched: boolean;
  setIsWatched: Dispatch<React.SetStateAction<boolean>>;
  onEvent?: () => void;
}) => {
  const onWatched = async () => {
    onEvent && onEvent();

    if (isWatched) {
      await removeFromWatchedDB();
    } else {
      await addToWatchedDB();
    }
  };

  const addToWatchedDB = async () => {
    if (!auth || !auth.currentUser) {
      createWatchedPopup(title, PopupAction.ERROR);
      return;
    }

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      watched: arrayUnion({ movieID: id }),
    }).then(() => {
      setIsWatched(true);
      createWatchedPopup(title, PopupAction.WATCHED);
    });
  };

  const removeFromWatchedDB = async () => {
    if (!auth || !auth.currentUser) {
      createWatchedPopup(title, PopupAction.ERROR);
      return;
    }

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      watched: arrayRemove({ movieID: id }),
    }).then(() => {
      setIsWatched(false);
      createWatchedPopup(title, PopupAction.REMOVED);
    });
  };

  return (
    <>
      <div onClick={onWatched} className="p-2">
        <Image
          src={isWatched ? remWatched : watchIcon}
          width={20}
          height={20}
          alt={
            isWatched
              ? "Remove movie from watched icon"
              : "Add movie to watched icon"
          }
          aria-label={
            isWatched
              ? "Remove movie from watched list"
              : "Add movie to watched list"
          }
        />
      </div>
    </>
  );
};
