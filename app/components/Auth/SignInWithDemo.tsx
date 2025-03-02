import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export const SignInWithDemo = () => {
  const signInWithDemoAccount = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        "testwithemail@mail.com",
        "mypassword"
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(
        "error while signing in with demo account:",
        errorCode,
        errorMessage
      );
    }
  };

  return (
    <p
      className="sans-serif text-sh-grey md:hover:text-p-white z-50 mx-3 font-bold uppercase tracking-widest md:mx-0 md:ml-4 md:text-xs md:hover:cursor-pointer"
      onClick={signInWithDemoAccount}
    >
      DEMO
    </p>
  );
};
