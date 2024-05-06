import React, { useEffect, useState } from 'react';

// DB FIREBASE
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// SPA & UI
import Navbar from './components/UI_components/navbar_component_and_assets/Navbar';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './pages/MyRoutes';
import Footer from './components/UI_components/footer_component_and_assets/Footer';
import ScrollToTop from './pages/ScrollToTop';

const App = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const [fetchResults, setFetchResults] = useState([]);
  const [isProfileUpdated, setProfileUpdated] = useState(false);
  const [isNavTransparent, setNavTransparent] = useState(false);

  /**
   * This is a variable currently needed app-wide for re-fetching upon doing actions (fav/watch)
   * Ideally this can be handled a lot better, but for now it is needed on the user profile so that the data re-renders properly.
   */
  const [newDataGained, setNewDataGained] = useState(false);

  const fetchRequest = (url) => {
    fetch(url)
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
