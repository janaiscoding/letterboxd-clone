import React, { useEffect, useState } from "react";

// DB FIREBASE
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

// SPA & UI
import Navbar from "./components/UI_components/navbar_component_and_assets/Navbar";
import { BrowserRouter, HashRouter } from "react-router-dom";
import MyRoutes from "./pages/MyRoutes";
import Footer from "./components/UI_components/footer_component_and_assets/Footer";
import ScrollToTop from "./pages/ScrollToTop";

const App = () => {
  const apiKey = "90a83017dcd0ef93c3e5474af9093de9";
  const [authStatus, setAuthStatus] = useState(false);
  const [fetchResults, setFetchResults] = useState([]);
  const [isProfileUpdated, setProfileUpdated] = useState(false);
  const [isNavTransparent, setNavTransparent] = useState(false);
  const [newDataGained, setNewDataGained] = useState(false); //db event listener

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
        setAuthStatus(true);
      } else {
        setAuthStatus(false);
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar
          apiKey={apiKey}
          authStatus={authStatus}
          fetchRequest={fetchRequest}
          isProfileUpdated={isProfileUpdated}
          setProfileUpdated={setProfileUpdated}
          setNavTransparent={setNavTransparent}
          isNavTransparent={isNavTransparent}
          setNewDataGained={setNewDataGained}
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
          //handler for movies
          setNewDataGained={setNewDataGained}
          newDataGained={newDataGained}
          //handler for transparent navbar
          isNavTransparent={isNavTransparent}
          setNavTransparent={setNavTransparent}
        />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
