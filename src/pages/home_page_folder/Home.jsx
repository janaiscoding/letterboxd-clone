import React, { useEffect } from "react";
import PopularHome from "./PopularHome";
import IntroMessage from "./IntroMessage";
import UpgradeToPro from "./UpgradeToPro";
import LatestNews from "./LatestNews";
import RecentStories from "./RecentStories";

const Home = ({ apiKey, fetchResults, fetchRequest,authStatus }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-b-blue">
    <div className="site-content md:py-8 md:w-9/12 md:my-0 md:mx-auto" >
      <IntroMessage authStatus={authStatus} />
      <UpgradeToPro />
      <PopularHome populars={fetchResults} />
      <LatestNews />
      <RecentStories />
    </div>
    </div>
  );
};

export default Home;
