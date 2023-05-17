import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import React, { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";

//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review) /watched(movieid, iswatched)/watchlist

const SignInGoogle = () => {
  const [isInColl, setIsInColl] = useState(false);

  const handleAuthEvent = async () => {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;

        console.log(user, "has logged in");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const checkUsersFromDB = async () => {
    const docRef = doc(db, "user/" + auth.currentUser.uid);
    const userDoc = await getDoc(docRef);

    if (userDoc.exists()) {
      console.log(`my uid`, auth.currentUser.uid);
      console.log(`my user doc`, userDoc.data());
      console.log("my doc exists bruh");
    }
    // userDoc.exists() ? setIsInColl(true) : await addNewUserToDB();
    // console.log(isInColl);
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      bio: "placeholder bio",
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
        className="ml-4
      text-base 
    text-sh-grey 
    font-semibold 
    hover:text-p-white	
    hover:cursor-pointer 
    uppercase"
        onClick={onLogin}
      >
        {" "}
        Google
      </p>
    </>
  );
};

export default SignInGoogle;
