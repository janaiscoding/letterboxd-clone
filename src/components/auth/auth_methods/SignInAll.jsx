import SignInGoogle from "./SignInGoogle";
import React from "react";
import SignInTest from "./SignInTest";

const SignInAll = ({ setShowLogin }) => {
  return (
    <div
      className="
    flex
    ml-4 
    self-center
    items-center
    pt-2"
    >
      <SignInTest /> {" "}
      <SignInGoogle />
    </div>
  );
};
//when i sign in, check if user exists
//if not, create db references and docs and collection for it like this:
// users / displayName (name, bio, reviews, watched) /favourites (movieid, isfav) / reviews (movieid, review)
export default SignInAll;
