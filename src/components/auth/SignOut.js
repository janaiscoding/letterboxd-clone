import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase";

// this will work on any auth type
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
      <button onClick={onSignOut}>Sign Out</button>
    </>
  );
};

export default SignOut;
