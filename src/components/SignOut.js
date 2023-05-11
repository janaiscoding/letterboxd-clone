import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebase";

const SignOut = () => {
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <button onClick={onSignOut}>logout</button>
    </>
  );
};

export default SignOut;
