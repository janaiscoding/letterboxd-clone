import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films_Handlers/Films";
import Members from "../pages/Members";
import Journal from "../pages/Journal";
import Lists from "../pages/Lists";

import Results from "../pages/Results";
import MoviePage from "../pages/MoviePage";
import Profile from "./auth/profile_info/Profile";
import FilterPage from "../pages/Films_Handlers/FilterPage";

const MyRoutes = ({
  authStatus,
  apiKey,
  fetchRequest,
  fetchResults,
  setFetchResults,
  setProfileUpdated,
  isProfileUpdated
}) => {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Home
            apiKey={apiKey}
            fetchRequest={fetchRequest}
            fetchResults={fetchResults}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <Profile
            authStatus={authStatus}
            isProfileUpdated={isProfileUpdated}
            setProfileUpdated={setProfileUpdated}
          />
        }
      />
      <Route path="/films" element={<Films />} />
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
          />
        }
      />
      <Route
        path="/movie/:movieId"
        element={
          <MoviePage
            apiKey={apiKey}
            fetchResults={fetchResults}
            fetchRequest={fetchRequest}
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
          />
        }
      />
    </Routes>
  );
};

export default MyRoutes;
