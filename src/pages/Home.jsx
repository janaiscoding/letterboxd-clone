import React, { useEffect } from "react";
import PopularHome from "./Home_Handlers/PopularHome";
import IntroMessage from "./Home_Handlers/IntroMessage";
import UpgradeToPro from "./Home_Handlers/UpgradeToPro";
import LatestNews from "./Home_Handlers/LatestNews";
import RecentStories from "./Home_Handlers/RecentStories";

const Home = ({ apiKey, fetchResults, fetchRequest,authStatus }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-section">
      <IntroMessage authStatus={authStatus} />
      <UpgradeToPro />
      <PopularHome populars={fetchResults} />
      <LatestNews />
      <RecentStories />
    </div>
  );
};

export default Home;
