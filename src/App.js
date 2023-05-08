import React, { useEffect, useState } from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";

const App = () => {
  const myTmdbApiKey = "90a83017dcd0ef93c3e5474af9093de9";
  const [movieData, setMovieData] = useState([]);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/500?api_key=" + myTmdbApiKey
  );
  const handleUrl = (modifier) => {
    setUrl(
      "https://api.themoviedb.org/3/movie" +
        modifier +
        "?api_key" +
        myTmdbApiKey
    );
  };
  //INITIAL API CALL
  useEffect(() => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        // console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [url]);
  return (
    <>
      <HashRouter>
        <Navbar />
        <MyRoutes movieData={movieData} handleUrl={handleUrl} />
      </HashRouter>
    </>
  );
};

export default App;
