import EmailPwToggler from "./EmailAndPassword/EmailPwToggler";
import SignInGoogle from "./google/SignInGoogle";
import React from "react";

const SignInAll = () => {
  return (
    <div className="sign-in-methods">
      <div className="sign-in-email">
        <EmailPwToggler />
      </div>
      <div className="sign-in-google">
        <p> Or Sign In with your Google Account</p>
        <SignInGoogle />
      </div>
    </div>
  );
};
//when i sign in, check if user exists 
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review) 
export default SignInAll;
