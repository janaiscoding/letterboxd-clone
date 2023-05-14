import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

// this will work on any auth type
const SignOut = () => {
  const navigate = useNavigate();
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
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
