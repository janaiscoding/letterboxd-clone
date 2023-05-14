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
    const userDoc = await getDoc(doc(db, "user/" + auth.currentUser.uid));
    userDoc.exists() ? setIsInColl(true) : await addNewUserToDB();
    console.log(isInColl);
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      bio: "placeholder bio",
      reviews: [
        {
          movieID: 242582,
          review: "most exciting movie ever",
        },
      ],
      watched: [
        {
          movieID: 242582,
          isWatched: true,
        },
      ],
      favourites: [
        {
          movieID: 242582,
          isFav: true,
        },
      ],
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
      <button onClick={onLogin}>Sign In With Google</button>
    </>
  );
};

export default SignInGoogle;
