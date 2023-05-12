import React from "react";

const Home = ({ movieData }) => {

  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div className="home-section">
      This is my Home component and I am rendering {movieData.title} from my
      Api.
    </div>
  );
};

export default Home;
