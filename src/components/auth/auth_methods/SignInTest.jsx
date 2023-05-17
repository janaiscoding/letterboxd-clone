import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import React, { useState } from "react";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignInTest = () => {
  const [isInColl, setIsInColl] = useState(false);

  const handleAuthEvent = async () => {
    await signInWithEmailAndPassword(
      auth,
      "testwithemail@mail.com",
      "mypassword"
    )
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "has logged in with new info");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const checkUsersFromDB = async () => {
    const userDoc = await getDoc(doc(db, "user/" + auth.currentUser.uid));
    console.log(isInColl)
    userDoc.exists() ? setIsInColl(true) : await addNewUserToDB();
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      name: "Testing Account",
      uid: auth.currentUser.uid,
      bio: "Nice to see you!",
      photoUrl: "",
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
    <p
      className="text-base 
    text-sh-grey 
    font-semibold 
    hover:text-p-white	
    hover:cursor-pointer 
    uppercase"
      onClick={onLogin}
    >
      Test Acc.
    </p>
  );
};
//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review)
export default SignInTest;
