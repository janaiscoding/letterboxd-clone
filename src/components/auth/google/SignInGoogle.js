import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import React from "react";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

//when i sign in, check if user exists 
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review) /watched(movieid, iswatched)/watchlist

const SignInGoogle = () => {
  let userExists = false;

  const handleAuthEvent = async () =>{
    let provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, 'has logged in')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
  const onLogin = async () => {
    // handle auth
    await handleAuthEvent().then(async ()=>{
      await checkUsersFromDB()
    }).then(async ()=>{
      if(!userExists) {
        await addNewUserToDB();
        }
    }).catch((err)=>{
      console.log(err)
    })
  };
  // checks if logged in account already exists in db
  const checkUsersFromDB = async () => {
    const displayName = auth.currentUser.displayName;
    const usersRef = collection(db, "users")
    const query = await getDocs(usersRef)
    query.forEach((user)=>{
      console.log(user.data())
      if(user.id === displayName){
        console.log('user was already found in db')
        userExists = true;
      }
      return userExists;
    })
  }
  // creates a new collection and subcollections
  const addNewUserToDB = async ()=>{
    const displayName = auth.currentUser.displayName;
    await setDoc(doc(db, 'users', displayName), {
      name: displayName,
      bio: 'placeholder bio',
      reviews: [
        {
        movieID: 242582,
        review: 'most exciting movie ever'
        }
      ],
      watched: [
        {
        movieID: 242582,
        isWatched: true,
        }
      ],
      favourites: [
         {
          movieID: 242582,
          isFav: true,
        },
        ]
    }).catch((err) =>{
      console.log(err)
    })
  }
  return (
    <>
      <button onClick={onLogin}>Sign In With Google</button>
    </>
  );
};

export default SignInGoogle;
