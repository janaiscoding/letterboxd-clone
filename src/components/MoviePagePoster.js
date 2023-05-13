import React from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, getDoc,doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {
  let movieFavourited = false;
  const onFavourite = async (movie) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      await checkMovie(movie).then( async ()=>{
        console.log('i know if the checkmovie returns true or false now')
        if(movieFavourited){
          console.log('if movieFavourited is true i deleteFromFavs(movie)')
        }
        else if (!movieFavourited){
        await AddToFavsDB(movie)
        console.log('added to db')
      }
      //i can replace with a ternary operator
      })
      // no need to check if user exists, already doing this on login
      // now checking db if movie is alrdy fav
    }
  };
  //returns true or false based on the checked movie
  const checkMovie = async (movie) =>{
    const userId = auth.currentUser.displayName;
    const userRef = await getDoc(doc(collection(db, "users"),userId))
    const userFavs = userRef.data().favourites;
    userFavs.forEach((favMovie)=>{
      if(favMovie.movieID === movie.id){
        movieFavourited = true; 
      }
      else {
        movieFavourited = false;
      }
      return movieFavourited;
      })
  } 

  const AddToFavsDB = async (movie) => {
    console.log('calling add to favs db function', movie)
    const userId = auth.currentUser.displayName;

    const userFavRef = doc(db, "users", userId);
    await updateDoc(userFavRef, {
    favourites: arrayUnion({
      movieID: movie.id,
      isFav: true,
    })
    });

  }
  return (
    <div key={movie.id}>
      <h1>{movie.title}</h1>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
        alt={movie.title}
        width={200}
      />
      <button onClick={() => onFavourite(movie)}>Favourite</button>
    </div>
  );
};

export default MoviePagePoster;
