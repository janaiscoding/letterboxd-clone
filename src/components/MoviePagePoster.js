import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, getDoc,getDocs, doc, updateDoc, arrayRemove, arrayUnion, setDoc } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {
  const [review, setReview] = useState('')
  let movieExists = false;
  let movieFavourited = false;
  let movieWatched = false;
  let movieReviewed = false;
  let fetchedReview = "";

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

  // REVIEW LOGIC 
  // 1. SEND MY REVIEW TO MY USER DB
  // 2. CREATE MOVIE DB COLLECTION AND SAVE IT UNDER ITS ID  
  // 3. SEND REVIEW + USER DATA => THEN USE EFFECT TO PULL THE REVIEWS ON TOP OF THE API DATA
  const onReview = async (movie, review) => {
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } 
     else {
      await checkMovieReviewedDB(movie).then( async ()=>{
        if(movieReviewed){
          console.log('movie is already reviewed, maybe setup an edit/alert u cant edit ur review mmm')
        }
        else if (!movieReviewed){
        await addReviewDB(movie, review)
        console.log('added review to the movie')

        console.log('create movie db/check if it exists + send review there too')
      }
      //i can replace with a ternary operator?
      })
    }
  }
  const checkMovieReviewedDB = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = await getDoc(doc(collection(db, "users"),userId))
    const userRevs = userRef.data().reviews;
    userRevs.forEach((reviewedMovie)=>{
      if(reviewedMovie.movieID === movie.id){
        movieReviewed = true; 
      }
      else {
        movieReviewed = false;
      }
      return movieReviewed;
      })
  }
  const addReviewDB = async (movie, review) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
    reviews: arrayUnion({
      movieID: movie.id,
      review: review,
    })
    }).then(async () => {
      console.log('calling from add review in db', movie.id, review)
      await checkMovieInDB(movie).then( async () => {
        console.log('successful call,', movieExists)  
        if(!movieExists) {
          console.log('movie doesnt exist, calling add new')
          await addNewMovieDB(review)
        }
        else {
          console.log('movie exists, so now im adding on top of it')
          await addNewReviewToMovieDB(review)
        }
      })
    });
  }

  // DELETING REVIEW LOGIC
  const fetchReviewFromDB = async (movie )=>{
    const userId = auth.currentUser.displayName;
   const userRefer = await getDoc(doc(collection(db, "users"),userId))
   const userRevs = userRefer.data().reviews;
   userRevs.forEach((rev)=>{
      if(movie.id === rev.movieID){
        fetchedReview= rev.review;
          }
              return fetchedReview;
          })
          return fetchedReview;
  }

  // works but gotta make sure i delete it from the movie collection too
  const onDeleteReview = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);
    await fetchReviewFromDB(movie).then( async()=>{
      await updateDoc(userRef, {
        reviews: arrayRemove({
          movieID: movie.id,
          review: fetchedReview,
        })
      })
    })
    //also gotta delete from db movies

  }
    // MOVIE FROM DATABASE LOGIC 
    // checks if this movie already exists in db
    const checkMovieInDB = async (movie) => {
      console.log('checking for movie now')
      const movieRef = collection(db, "movies")
      const query = await getDocs(movieRef)
      query.forEach((movieDB)=>{
        if(movieDB.data().movieID === movie.id){
          console.log('movie was found in the db')
          movieExists = true;
        }
        return movieExists;
      })
      console.log('checked for movie in my db collection, result was: ', movieExists)
    }
    // creates a new collection for movies
  const addNewMovieDB = async (review)=>{    
    console.log('calling add new movie to db')
    const user = auth.currentUser.displayName;
    const movieID =  movie.id;
    console.log(user, movieID)
    // the docs will be id'ed by movie id in case of title duplicates
    await setDoc(doc(db, 'movies/'+ movieID),{
      movieID: movieID,
      reviews: [
        {
          review: review,
          user: user,
        }
      ]
    })
  }
  // add new review to movie that exists
  const addNewReviewToMovieDB = async (review) => {
    console.log('checking if im adding on top')
    // const movieID =  movie.id;
    // const user = auth.currentUser.displayName;
    // const movieRef = doc(db, "movies/"+ movieID);
    // await updateDoc(movieRef, {
    // reviews: arrayUnion({
    //     user: user,
    //     review: review,
    // })
    // })

    const user = auth.currentUser.displayName;
    const movieID =  movie.id;
    const movieRef = doc(db, "movies/"+ movieID);

    await updateDoc(movieRef, {
    reviews: arrayUnion({
      user: user,
      review: review,
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
      <button onClick={() => onWatched(movie)}> Viewed</button>
      <div className="review-form">
        <input 
        value={review}
        onChange={(e) => setReview(e.target.value)} 
        type="text"
        />
        <button onClick={()=> onReview(movie, review)}>Send Review</button>
        <button onClick={()=> onDeleteReview(movie, review)}>Delete Review</button>
      </div>
    </div>
  );
};

export default MoviePagePoster;
