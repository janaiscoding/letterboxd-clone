import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      name: "Testing Account",
      uid: auth.currentUser.uid,
      bio: "Nice to see you!",
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
    <div className="sign-in-test">
      <p>Sign in with a test account</p>
      <button onClick={onLogin}>Sign IN with test acc</button>
    </div>
  );
};
//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review)
export default SignInTest;
