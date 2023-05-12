import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import React from "react";

const SignInGoogle = () => {
  const onLogin = async () => {
    let provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, `successfully logged in with google`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <button onClick={onLogin}>Sign In With Google</button>
    </>
  );
};

export default SignInGoogle;
