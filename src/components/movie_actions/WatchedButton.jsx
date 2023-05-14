import React, { useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const WatchedButton = ({ movie }) => {
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
      console.log("watched was succesffully added to db");
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
      console.log("movie was succesffully removed from db");
      setWatched(false);
    });
  };
  return (
    <>
      <button onClick={() => onWatched(movie)}>Add to watched movies</button>
    </>
  );
};

export default WatchedButton;
