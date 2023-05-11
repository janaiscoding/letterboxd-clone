import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Films from "../pages/Films";
import Members from "../pages/Members";
import Journal from "../pages/Journal";
import Lists from "../pages/Lists";
import Signup from "./Signup";
import Login from "./Login";

const MyRoutes = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<Home props={props} />} />
      <Route path="/films" element={<Films />} />
      <Route path="/lists" element={<Lists />} />
      <Route path="/members" element={<Members />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default MyRoutes;
