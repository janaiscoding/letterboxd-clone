import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

const FavouriteButton = ({ movie }) => {
  const [isFavourite, setFavourite] = useState(false);
  const [users, setUsers] = useState([]);
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
    const userId = auth.currentUser.displayName;
    const userDocument = await getDoc(doc(db, "users", userId));
    const userFavourites = userDocument.data().favourites;
    setFavourite(userFavourites.some((FM) => FM.movieID === movie.id));
  };
  const addToFavsDB = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      favourites: arrayUnion({
        movieID: movie.id,
      }),
    }).then(() => {
      setFavourite(true);
      console.log("movie was succesffully added to db");
    });
  };
  const removeFromFavsDB = async (movie) => {
    const userId = auth.currentUser.displayName;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      favourites: arrayRemove({
        movieID: movie.id,
      }),
    }).then(() => {
      console.log("movie was succesffully removed from db");
      setFavourite(false);
    });
  };
  // SOMETHING BUGGY HAPPENS WHEN I REFRESH- FOR LATER
  useEffect(() => {
    const findUsers = async (movie) => {
      // finding each instance of the movie's doc - useful for displaying a list of users which have fav'd that movie
      const arrayRef = query(
        collection(db, "users"),
        where("favourites", "array-contains", {
          movieID: movie.id,
        })
      );
      const queryDocs = await getDocs(arrayRef);
      let tempArray = [];
      queryDocs.forEach((doc) => {
        //  all the instances of this movie being fav'd
        const userFound = doc.data().name;
        tempArray.push(userFound);
      });
      setUsers(tempArray);
      console.log(users);
    };
    findUsers(movie);
  }, []);
  return (
    <>
      <button onClick={() => onFavourite(movie)}>
        {isFavourite ? "Un-favourite" : "Add to fav"}
      </button>
      <div>See who favourited this:</div>
    </>
  );
};

export default FavouriteButton;
