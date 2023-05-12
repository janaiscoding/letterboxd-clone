import React from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {
  const onFavourite = async () => {
    // const userRef = collection(db, "users");
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      console.log(`adding to fav`, movie.title);
      const userRef = collection(db, auth.currentUser.uid);
      await addDoc(userRef, {
        movie: movie,
      });
    }
    console.log("called til the end");
  };
  return (
    <div key={movie.id}>
      <h1>{movie.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={200}
      />
      <button onClick={onFavourite}>Favourite</button>
    </div>
  );
};

export default MoviePagePoster;
