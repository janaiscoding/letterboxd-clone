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

export default SignInAll;
