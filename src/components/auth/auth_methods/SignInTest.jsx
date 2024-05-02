import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignInTest = () => {
  const handleAuthEvent = async () => {
    await signInWithEmailAndPassword(
      auth,
      'testwithemail@mail.com',
      'mypassword'
    ).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };

  const checkUsersFromDB = async () => {
    const userDoc = await getDoc(doc(db, 'users/' + auth.currentUser.uid));
    if (!userDoc.exists()) {
      await addNewUserToDB();
    }
    //welcome back popup username!
  };
  // creates a new document for the new user
  const addNewUserToDB = async () => {
    await setDoc(doc(db, 'users/' + auth.currentUser.uid), {
      name: 'Demo',
      uid: auth.currentUser.uid,
      bio: 'I hope you like my project!',
      photoUrl:
        'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
      className="sans-serif z-50 mx-3 font-bold uppercase tracking-widest text-sh-grey md:mx-0 md:ml-4 md:text-xs md:hover:cursor-pointer md:hover:text-p-white"
      onClick={onLogin}
    >
      DEMO
    </p>
  );
};
//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review)
export default SignInTest;
