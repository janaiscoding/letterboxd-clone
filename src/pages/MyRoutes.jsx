import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './home/Home';
import Films from './films/Films';
import Members from './members/Members';
import Results from './search-results/Results';
import MoviePage from './movie/MoviePage';
import Profile from './profile/Profile';
import FilterPage from './films/FilterPage';
import Settings from './user-settings/Settings';
import NotFound from './NotFound';

import ProfileFavourites from './profile/ProfileFavourites';
import ProfileWatched from './profile/ProfileWatched';
import ReviewsPage from './reviews/ReviewsPage';

const MyRoutes = ({
  authStatus,
  fetchRequest,
  fetchResults,
  setFetchResults,
  setProfileUpdated,
  isProfileUpdated,
  setNewDataGained,
  newDataGained,
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MyRoutes;
