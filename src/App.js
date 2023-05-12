import React, { useEffect, useState } from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const myTmdbApiKey = "90a83017dcd0ef93c3e5474af9093de9";

  const [authStatus, setAuthStatus] = useState(false);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/discover/movie?api_key=" + myTmdbApiKey
  );

  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);

  const fetchRequest = (url, type) => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (type === "discover") {
          console.log("type is discover but who cares rly");
        } else if (type === "results") {
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
    //my initial api call
    console.log("initial api call showing popular movies");
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=90a83017dcd0ef93c3e5474af9093de9",
      "popular"
    );
  }, []);
  return (
    <>
      <HashRouter>
        <Navbar authStatus={authStatus} handleSearchReq={handleSearchReq} />
        <MyRoutes popular={popular} results={results} />
      </HashRouter>
    </>
  );
};

export default App;
