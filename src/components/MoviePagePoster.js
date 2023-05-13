import React from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, getDoc,doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {
  let movieFavourited = false;
  let movieWatched = false;

    // WATCHLIST LOGIC
  const onWatched= async (movie) =>{
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } 
    else {
      await checkMovieWatchedDB(movie).then( async ()=>{
        if(movieWatched){
          await removeFromWatchedDB(movie)
          console.log('removed from db watchlists')
        }
        else if (!movieWatched){
        await addToWatchedDB(movie)
        console.log('added to watchlist')
      }
      //i can replace with a ternary operator?
      })
    }
  };
    //returns true or false based on the checked movie
    const checkMovieWatchedDB = async (movie) =>{
      const userId = auth.currentUser.displayName;
      const userRef = await getDoc(doc(collection(db, "users"),userId))
      const userFavs = userRef.data().watched;
      userFavs.forEach((watchedMovie)=>{
        if(watchedMovie.movieID === movie.id){
          movieWatched = true; 
        }
        else {
          movieWatched = false;
        }
        return movieWatched;
        })
    } 
  
    const addToWatchedDB = async (movie) => {
      const userId = auth.currentUser.displayName;
      const userRef = doc(db, "users", userId);
  
      await updateDoc(userRef, {
      watched: arrayUnion({
        movieID: movie.id,
        isWatched: true,
      })
      });
    }
    const removeFromWatchedDB = async (movie) => {
      const userId = auth.currentUser.displayName;
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        watched: arrayRemove({
          movieID: movie.id,
          isWatched: true,
        })
      })
    }


  // FAVOURITE LOGIC
  const onFavourite = async (movie) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      await checkMovieFavsDB(movie).then( async ()=>{
        if(movieFavourited){
          await removeFromFavsDB(movie)
          console.log('removed from db')
        }
        else if (!movieFavourited){
        await addToFavsDB(movie)
        console.log('added to db')
      }
      //i can replace with a ternary operator?
      })
    }
  };

  //returns true or false based on the checked movie
  const checkMovieFavsDB = async (movie) =>{
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

  const addToFavsDB = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
    favourites: arrayUnion({
      movieID: movie.id,
      isFav: true,
    })
    });
  }
  const removeFromFavsDB = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favourites: arrayRemove({
        movieID: movie.id,
        isFav: true,
      })
    })
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
      <button onClick={() => onWatched(movie)}> Viewed</button>
    </div>
  );
};

export default MoviePagePoster;
