import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebase';
import React from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    const userDoc = await getDoc(doc(db, 'users/' + auth.currentUser.uid));
    userDoc.exists() ? console.log('fetched data') : await addNewUserToDB();
    //welcome back popup username!
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      bio: 'I hope you like my project!',
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
        className="sans-serif z-50 mx-3 font-bold uppercase tracking-widest text-sh-grey md:mx-0 md:ml-4 md:text-xs md:hover:cursor-pointer md:hover:text-p-white"
        onClick={onLogin}
      >
        Google
      </p>
    </>
  );
};

export default SignInGoogle;
