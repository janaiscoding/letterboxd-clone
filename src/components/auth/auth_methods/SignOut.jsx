import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../../firebase/firebase";
import { useNavigate, useLocation } from "react-router-dom";

// this will work on any auth type
const SignOut = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        if (location.contains("profile")) {
          navigate("/");
        }
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
      <p className="block pt-2 px-4 md:p-0" onClick={onSignOut}>
        Sign Out
      </p>
    </>
  );
};

export default SignOut;
