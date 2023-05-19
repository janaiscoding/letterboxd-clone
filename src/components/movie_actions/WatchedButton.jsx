/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import watchIcon from "./watched.png";
import remWatched from "./remWatched.png";
const WatchedButton = ({ movie, setNewDataGained }) => {
  const [isWatched, setWatched] = useState(false);
  // WATCHED LIST LOGIC
  const onWatched = async (movie) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      await checkMovieWatchedDB(movie).then(async () => {
        isWatched
          ? await removeFromWatchedDB(movie)
          : await addToWatchedDB(movie);
      });
    }
  };

  //returns true or false based on the checked movie
  const checkMovieWatchedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));
    const userWatched = userDoc.data().watched;
    setWatched(userWatched.some((WM) => WM.movieID === movie.id));
  };

  const addToWatchedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      watched: arrayUnion({
        movieID: movie.id,
      }),
    }).then(() => {
      setWatched(true);
      setNewDataGained(true)

    });
  };
  const removeFromWatchedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      watched: arrayRemove({
        movieID: movie.id,
      }),
    }).then(() => {
      setNewDataGained(true)
      setWatched(false);
    });
  };
  useEffect(() => {
    if (auth.currentUser != null) {
      checkMovieWatchedDB(movie);
    }
  }, [movie]);
  return (
    <>
      <div onClick={() => onWatched(movie)} className="p-2">
        {isWatched ? (
          <img
            src={remWatched}
            width={20}
            height={20}
            alt="add movie to favourites icon"
          />
        ) : (
          <img
            src={watchIcon}
            width={20}
            height={20}
            alt="add movie to favourites icon"
          />
        )}
      </div>
    </>
  );
};

export default WatchedButton;
