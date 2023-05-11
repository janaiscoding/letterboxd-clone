import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../firebase/firebase";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
         navigate('/')
        console.log(user, `successfully logged in`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <>
      <form className="form-login">
        <div className="form-group form-group-email">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            aria-label="email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group form-group-password">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </div>
        <button type="submit" onClick={onLogin}>
          LOGIN
        </button>
      </form>
      <p>
        Don't have an account?
        <NavLink to="/signup">Sign Up</NavLink>
      </p>
    </>
  );
};
export default Login;
