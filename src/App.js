import React, { useEffect, useState } from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const apiKey = "90a83017dcd0ef93c3e5474af9093de9";

  const [authStatus, setAuthStatus] = useState(false);
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/discover/movie?api_key=" + apiKey
  );
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
        apiKey +
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
  }, []);
  return (
    <>
      <HashRouter>
        <Navbar authStatus={authStatus} handleSearchReq={handleSearchReq} />
        <MyRoutes
          apiKey={apiKey}
          movie={movie}
          popular={popular}
          results={results}
          fetchRequest={fetchRequest}
        />
      </HashRouter>
    </>
  );
};

export default App;
