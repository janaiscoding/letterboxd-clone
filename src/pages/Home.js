import React from "react";
import Popular from "../components/Popular";

const Home = ({ popular }) => {
  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div className="home-section">
      This is my Home component and I am rendering all sorts of cool stuff.
      <Popular popular={popular} />
    </div>
  );
};

export default Home;
