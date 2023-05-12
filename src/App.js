import React, { useEffect, useState } from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const myTmdbApiKey = "90a83017dcd0ef93c3e5474af9093de9";
  const [movieData, setMovieData] = useState([]);
  const [authStatus, setAuthStatus] = useState(false);
  const [results, setResults] = useState([]);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/discover/movie?api_key=" + myTmdbApiKey
  );
  const handleSearchReq = (query) => {
    console.log(`calling handle url with the query of`, query);
    setUrl(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        myTmdbApiKey +
        "&query=" +
        query
    );
    fetchRequest(url, "results");
    console.log(`ive fetched the results`, results);
  };
  const fetchRequest = (url, type) => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (type === "discover") {
          console.log("type is discover");
          setMovieData(data);
        } else if (type === "results") {
          console.log("type is results");
          setResults(data);
        }
        console.log(data, `my new movie data inside my handlerFunction`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    //auth status in my app (my listener)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user is currently logged in");
        setAuthStatus(true);
      } else {
        console.log("user is not logged in");
        setAuthStatus(false);
      }
    });
    //my initial api call
    console.log("initial api call showing popular movies");
    fetchRequest(
      "https://api.themoviedb.org/3/search/movie?api_key=90a83017dcd0ef93c3e5474af9093de9",
      "discover"
    );
  }, []);
  return (
    <>
      <HashRouter>
        <Navbar authStatus={authStatus} handleSearchReq={handleSearchReq} />
        <MyRoutes movieData={movieData} results={results} />
      </HashRouter>
    </>
  );
};

export default App;
