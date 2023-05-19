import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home_page_folder/Home";
import Films from "./films_page_folder/Films";
import Members from "./members_page_folder/Members";
import Journal from "./journal_page_folder/Journal";
import Lists from "./lists_page_folder/Lists";

import Results from "./results_page_folder/Results";
import MoviePage from "./movie_page_folder/MoviePage";
import Profile from "./profile_page_folder/Profile";
import FilterPage from "./films_page_folder/FilterPage";
import Settings from "./settings_page_folder/Settings";

const MyRoutes = ({
  authStatus,
  apiKey,
  fetchRequest,
  fetchResults,
  setFetchResults,
  setProfileUpdated,
  isProfileUpdated,
  setNewDataGained,
  newDataGained,
  setNavTransparent
}) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
            apiKey={apiKey}
            authStatus={authStatus}
            fetchRequest={fetchRequest}
            fetchResults={fetchResults}
            setNewDataGained={setNewDataGained}
          />
        }
      />
      <Route
        path="/profile/:uid"
        element={
          <Profile
            apiKey={apiKey}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            authStatus={authStatus}
            isProfileUpdated={isProfileUpdated}
            setProfileUpdated={setProfileUpdated}
            setNewDataGained={setNewDataGained}
            newDataGained={newDataGained}
          />
        }
      />
      <Route
        path="/films"
        element={<Films setNewDataGained={setNewDataGained} />}
      />
      <Route path="/lists" element={<Lists />} />
      <Route path="/members" element={<Members />} />
      <Route path="/journal" element={<Journal />} />
      <Route
        path="/results/:query"
        element={
          <Results
            apiKey={apiKey}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setNewDataGained={setNewDataGained}
          />
        }
      />
      <Route
        path="/movie/:movieId"
        element={
          <MoviePage
            apiKey={apiKey}
            authStatus={authStatus}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setNewDataGained={setNewDataGained}
            setNavTransparent={setNavTransparent}
          />
        }
      />
      <Route
        path="/films/:query"
        element={
          <FilterPage
            apiKey={apiKey}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setFetchResults={setFetchResults}
            setNewDataGained={setNewDataGained}
            
          />
        }
      />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default MyRoutes;
