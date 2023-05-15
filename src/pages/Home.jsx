import React, { useEffect } from "react";
import Popular from "../components/Popular";
import IntroMessage from "./Home_Handlers/IntroMessage";
const Home = ({ apiKey, fetchResults, fetchRequest }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-section">
      <IntroMessage />
      <Popular populars={fetchResults} />
    </div>
  );
};

export default Home;
