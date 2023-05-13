import React from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {

  const onFavourite = async () => {
    // const userRef = collection(db, "users");
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      console.log('my user is logged in, now checking his existing collection')
      const usersRef = collection(db, "users", auth.currentUser.displayName, "favourites");
      //checking my existing docs
      const query = await getDocs(usersRef);
      query.forEach((doc) =>{
          console.log(doc.data())
      })
    //  if(canFavourite){
    //   console.log('waiting for checking to finish, havent found the movie in my sets, so i can fav = ', canFavourite)
    //     await addDoc(userRef, {
    //    movie: movie,
    //    isFavourite: true,
    //     });
    //     }
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
