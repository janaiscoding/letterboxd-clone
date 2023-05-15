import React, { useEffect } from "react";
import Popular from "../components/Popular";

const Home = ({ apiKey, fetchResults, fetchRequest }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-section">
      <Popular populars={fetchResults} />
    </div>
  );
};

export default Home;
