import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

const MoviePagePoster = ({ movie }) => {
  const [canFavourite, setCanFavourite] = useState(true);

  const onFavourite = async () => {
    // const userRef = collection(db, "users");
    if (auth.currentUser === null) {
      alert("login to use this feature");
    } else {
      console.log('my user is logged in, now checking his existing collection')
      const userRef = collection(db, auth.currentUser.uid);
      //checking my existing docs
      const query = await getDocs(userRef);
      query.forEach((doc) =>{
        console.log(canFavourite)
        if(doc.data().movie.id === movie.id){
          console.log(doc.data())
          console.log('movie was found based on id and not name! you cant add it to favs already')
          console.log('setting my boolean value to false')
          setCanFavourite(false);
          console.log('why does it not set to false wtf!!')
          console.log(canFavourite)
          console.log("returning as soon as it was found")
          return;
        }
        return;
      })
     if(canFavourite){
      console.log('waiting for checking to finish, havent found the movie in my sets, so i can fav = ', canFavourite)
        await addDoc(userRef, {
       movie: movie,
       isFavourite: true,
        });
        }
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
