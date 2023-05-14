import React, { useEffect, useState } from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const App = () => {
  const apiKey = "90a83017dcd0ef93c3e5474af9093de9";
  const [authStatus, setAuthStatus] = useState(false);
  const [movie, setMovie] = useState([]);
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);

  const fetchRequest = (url, type) => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (type === "discover") {
          console.log("type is discover for one individual movie");
          setMovie(data);
        } else if (type === "results") {
          console.log(data);
          console.log("type is results");
          setResults(data);
        } else if (type === "popular") {
          console.log("type is popular");
          setPopular(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleSearchReq = (query) => {
    fetchRequest(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        apiKey +
        "&query=" +
        query,
      "results"
    );
  };

  useEffect(() => {
    //AUTH LISTENER
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is currently logged in");
        setAuthStatus(true);
      } else {
        console.log("user is not logged in");
        setAuthStatus(false);
      }
    });
  }, []);

  return (
    <>
      <HashRouter>
        <Navbar authStatus={authStatus} handleSearchReq={handleSearchReq}/>
        <MyRoutes
          authStatus={authStatus}
          apiKey={apiKey}
          movie={movie}
          popular={popular}
          results={results}
          fetchRequest={fetchRequest}
          handleSearchReq={handleSearchReq}
        />
      </HashRouter>
    </>
  );
};

export default App;
