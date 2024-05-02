import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home_page_folder/Home';
import Films from './films_page_folder/Films';
import Members from './members_page_folder/Members';
import Results from './results_page_folder/Results';
import MoviePage from './movie_page_folder/MoviePage';
import Profile from './profile_page_folder/Profile';
import FilterPage from './films_page_folder/FilterPage';
import Settings from './settings_page_folder/Settings';
import NotFound from './NotFound';

import ProfileFavourites from './profile_page_folder/ProfileFavourites';
import ProfileWatched from './profile_page_folder/ProfileWatched';
import ReviewsPage from './reviews_page_folder/ReviewsPage';

const MyRoutes = ({
  authStatus,
  fetchRequest,
  fetchResults,
  setFetchResults,
  setProfileUpdated,
  isProfileUpdated,
  setNewDataGained,
  newDataGained,
  setNavTransparent,
  isNavTransparent,
}) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
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
        path="/profile/favourites/:uid"
        element={
          <ProfileFavourites
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setNewDataGained={setNewDataGained}
            newDataGained={newDataGained}
          />
        }
      />
      <Route
        path="/profile/watched/:uid"
        element={
          <ProfileWatched
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setNewDataGained={setNewDataGained}
            newDataGained={newDataGained}
          />
        }
      />
      <Route
        path="/films"
        element={
          <Films
            authStatus={authStatus}
            fetchRequest={fetchRequest}
            fetchResults={fetchResults}
            setNewDataGained={setNewDataGained}
          />
        }
      />
      <Route path="/members" element={<Members />} />

      <Route
        path="/results/:query"
        element={
          <Results
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setNewDataGained={setNewDataGained}
            newDataGained={newDataGained}
          />
        }
      />
      <Route
        path="/movie/:movieId"
        element={
          <MoviePage
            authStatus={authStatus}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            newDataGained={newDataGained}
            setNewDataGained={setNewDataGained}
            setNavTransparent={setNavTransparent}
          />
        }
      />
      <Route
        path="/filter/:query"
        element={
          <FilterPage
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
            setFetchResults={setFetchResults}
            setNewDataGained={setNewDataGained}
          />
        }
      />
      <Route
        path="/settings"
        element={<Settings setProfileUpdated={setProfileUpdated} />}
      />
      <Route
        path="/reviews"
        element={<ReviewsPage setNewDataGained={setNewDataGained} />}
      />
      <Route
        path="*"
        element={
          <NotFound
            setNavTransparent={setNavTransparent}
            isNavTransparent={isNavTransparent}
          />
        }
      />
    </Routes>
  );
};

export default MyRoutes;
