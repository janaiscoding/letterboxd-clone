import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review) /watched(movieid, iswatched)/watchlist

const SignInGoogle = () => {
  const handleAuthEvent = async () => {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const checkUsersFromDB = async () => {
    const userDoc = await getDoc(doc(db, "users/" + auth.currentUser.uid));
    userDoc.exists() ? console.log("fetched data") : await addNewUserToDB();
    //welcome back popup username!
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      bio: "I hope you like my project!",
      photoUrl: auth.currentUser.photoURL,
      reviews: [],
      watched: [],
      favourites: [],
    }).catch((err) => {
      console.log(err);
    });
  };

  const onLogin = async () => {
    await handleAuthEvent().then(async () => {
      await checkUsersFromDB();
    });
  };
  return (
    <>
      <p
        className="mx-3 z-50 sans-serif text-sh-grey font-bold tracking-widest uppercase md:text-xs md:hover:text-p-white md:ml-4 md:hover:cursor-pointer md:mx-0"
        onClick={onLogin}
      >
        Google
      </p>
    </>
  );
};

export default SignInGoogle;
