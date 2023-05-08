import React from "react";
import MyRoutes from "./components/MyRoutes";
import Navbar from "./components/Navbar";
import { HashRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <HashRouter>
        <Navbar />
        <MyRoutes />
      </HashRouter>
    </>
  );
};

export default App;
