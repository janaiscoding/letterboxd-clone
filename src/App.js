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
    "https://api.themoviedb.org/3/movie/500?api_key=" + myTmdbApiKey
  );
  const handleUrl = (modifier) => {
    console.log(`calling handle url with the query of`, modifier);
    setUrl(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        myTmdbApiKey +
        "&query=" +
        modifier
    );
    console.log(url);
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
    console.log("fetching everytime url changes?");
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        console.log(data, `my new movie data inside useeffect`);
        setResults(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);
  return (
    <>
      <HashRouter>
        <Navbar authStatus={authStatus} handleUrl={handleUrl} />
        <MyRoutes
          movieData={movieData}
          handleUrl={handleUrl}
          results={results}
        />
      </HashRouter>
    </>
  );
};

export default App;
