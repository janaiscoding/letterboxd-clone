import React, { useEffect, useState } from "react";
import SignOut from "../components/SignOut";
import Login from "../components/Login";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
const Home = (props) => {
  let movieData = props.props.movieData;
  const [authStatus, setAuthStatus] = useState(false);
  //   let handleUrl = props.props.handleUrl;
  const handleButtonCall = (e) => {
    console.log(e.target.innerText);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthStatus(true);
      } else {
        setAuthStatus(false);
      }
    });
  }, []);
  return (
    <>
      This is my Home component and I am rendering {movieData.title} from my
      Api.
      <button onClick={(e) => handleButtonCall(e)}>Suzume</button>
      {authStatus ? <SignOut /> : <Login />}
    </>
  );
};

export default Home;
