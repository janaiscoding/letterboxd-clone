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
      <Popular popular={popular} />
    </div>
  );
};

export default Home;
