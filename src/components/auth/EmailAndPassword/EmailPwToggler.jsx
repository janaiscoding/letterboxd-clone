import SignInEmail from "./SignInEmail";
import SignUpEmail from "./SignupEmail";
import React, { useState } from "react";
const EmailPwToggler = () => {
  const [toggle, setToggle] = useState(true);
  const toggleForms = () => {
    return toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <div>
      {toggle ? (
        <div className="sign-in-form">
          <SignInEmail />
          <p onClick={toggleForms}>Don't have an account? </p>
        </div>
      ) : (
        <div className="sign-up-form">
          <SignUpEmail />
          <p onClick={toggleForms}> Already have an account?</p>
        </div>
      )}
    </div>
  );
};
export default EmailPwToggler;
