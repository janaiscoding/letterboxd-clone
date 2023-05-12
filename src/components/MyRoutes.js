import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";
import Members from "../pages/Members";
import Journal from "../pages/Journal";
import Lists from "../pages/Lists";
import Signup from "./auth/EmailAndPassword/SignupEmail";
import Login from "./auth/EmailAndPassword/SignInEmail";
import Results from "../pages/Results";
import MoviePage from "../pages/MoviePage";

const MyRoutes = ({ popular, results }) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home popular={popular} />} />
      <Route path="/films" element={<Films />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/members" element={<Members />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/results" element={<Results results={results} />} />
      <Route path="" element={<MoviePage />} />
    </Routes>
  );
};

export default MyRoutes;
