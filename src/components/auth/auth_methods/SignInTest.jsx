import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignInTest = () => {
  const handleAuthEvent = async () => {
    await signInWithEmailAndPassword(
      auth,
      "testwithemail@mail.com",
      "mypassword"
    ).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const checkUsersFromDB = async () => {
    const userDoc = await getDoc(doc(db, "users/" + auth.currentUser.uid));
    userDoc.exists() ? console.log("fetched data for the existing user") : await addNewUserToDB();
    //welcome back popup username!
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, "users/" + auth.currentUser.uid), {
      name: "Demo",
      uid: auth.currentUser.uid,
      bio: "Nice to see you!",
      photoUrl:
        "https://cdn.discordapp.com/attachments/948205733688786974/1108464787651833987/image.png",
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
      className="sans-serif text-xs text-sh-grey font-bold tracking-widest hover:text-p-white	hover:cursor-pointer uppercase"
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
