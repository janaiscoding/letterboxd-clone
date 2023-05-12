import React, { useEffect } from "react";
import Popular from "../components/Popular";

const Home = ({ apiKey, popular, fetchRequest }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey,
      "popular"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="home-section">
      This is my Home component and I am rendering all sorts of cool stuff.
      <Popular popular={popular} />
    </div>
  );
};

export default Home;
