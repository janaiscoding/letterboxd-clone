import React, { useEffect, useState } from "react";

// DB FIREBASE
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// SPA & UI
import Navbar from "./components/UI_components/navbar_component_and_assets/Navbar";
import { HashRouter } from "react-router-dom";
import MyRoutes from "./pages/MyRoutes";
import Footer from "./components/UI_components/footer_component_and_assets/Footer";

const App = () => {
  const apiKey = "90a83017dcd0ef93c3e5474af9093de9";
  const [authStatus, setAuthStatus] = useState(false);
  const [fetchResults, setFetchResults] = useState([]);
  const [isProfileUpdated, setProfileUpdated] = useState(false);

  const fetchRequest = (url) => {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setFetchResults(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
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
        <Navbar
          apiKey={apiKey}
          authStatus={authStatus}
          fetchRequest={fetchRequest}
          isProfileUpdated={isProfileUpdated}
          setProfileUpdated={setProfileUpdated}
        />
        <MyRoutes
          authStatus={authStatus}
          apiKey={apiKey}
          fetchResults={fetchResults}
          fetchRequest={fetchRequest}
          //handler for genres
          setFetchResults={setFetchResults}
          //handler for settings
          setProfileUpdated={setProfileUpdated}
          isProfileUpdated={isProfileUpdated}
        />
        <Footer />
      </HashRouter>
    </>
  );
};

export default App;
