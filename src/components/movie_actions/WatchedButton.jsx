/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase/firebase';
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from 'firebase/firestore';
import watchIcon from './watched.png';
import remWatched from './remWatched.png';
const WatchedButton = ({ movie, setNewDataGained }) => {
  const [isWatched, setWatched] = useState(false);
  // WATCHED LIST LOGIC
  const onWatched = async (movie) => {
    if (auth.currentUser === null) {
      createPopup(movie.title, 'error');
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
    const userDoc = await getDoc(doc(db, 'users', userId));
    const userWatched = userDoc.data().watched;
    setWatched(userWatched.some((WM) => WM.movieID === movie.id));
  };

  const addToWatchedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);

    await updateDoc(userRef, {
      watched: arrayUnion({
        movieID: movie.id,
      }),
    }).then(() => {
      setWatched(true);
      setNewDataGained(true);
      createPopup(movie.title, 'watched');
    });
  };
  const removeFromWatchedDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      watched: arrayRemove({
        movieID: movie.id,
      }),
    }).then(() => {
      setNewDataGained(true);
      setWatched(false);
      createPopup(movie.title, 'removed');
    });
  };

  const createPopup = (title, action) => {
    const popupAlert = document.createElement('div');
    popupAlert.classList.add('popup');
    if (action === 'watched') {
      popupAlert.innerText = `Added ${title} to watched list!`;
    } else if (action === 'error') {
      popupAlert.innerText = `Sign in to add to watched list!`;
    } else if (action === 'removed') {
      popupAlert.innerText = `Removed ${title} from watched list!`;
    }
    document.body.append(popupAlert);
    setTimeout(() => {
      popupAlert.remove();
    }, 1000);
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
