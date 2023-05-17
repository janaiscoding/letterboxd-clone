/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import favIcon from "./fav.png";
import removeFavIcon from "./remFav.png";

const FavouriteButton = ({ movie, setNewDataGained }) => {
  const [isFavourite, setFavourite] = useState(false);
  // console.log(movie, "from fav button");
  // FAVOURITE LOGIC
  const onFavourite = async (movie) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      await checkMovieFavsDB(movie).then(async () => {
        isFavourite ? await removeFromFavsDB(movie) : await addToFavsDB(movie);
      });
    }
  };

  //returns true or false based on the checked movie
  const checkMovieFavsDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userDoc = await getDoc(doc(db, "users", userId));
    const userFavs = userDoc.data().favourites;
    setFavourite(userFavs.some((FM) => FM.movieID === movie.id));
  };
  const addToFavsDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favourites: arrayUnion({
        movieID: movie.id,
      }),
    }).then(() => {
      setFavourite(true);
      setNewDataGained(true);
      console.log("favourite was succesffully added to db");
    });
  };
  const removeFromFavsDB = async (movie) => {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favourites: arrayRemove({
        movieID: movie.id,
      }),
    }).then(() => {
      console.log("movie was succesffully removed from db");
      setFavourite(false);
      setNewDataGained(true);
    });
  };
  useEffect(() => {
    if (auth.currentUser != null) {
      checkMovieFavsDB(movie);
    }
  }, [movie]);
  return (
    <>
      <div className="p-2" onClick={() => onFavourite(movie)}>
        {isFavourite ? (
          <img
            src={removeFavIcon}
            width={20}
            height={20}
            alt="add movie to favourites icon"
          />
        ) : (
          <img
            src={favIcon}
            width={20}
            height={20}
            alt="add movie to favourites icon"
          />
        )}
      </div>
    </>
  );
};

export default FavouriteButton;
