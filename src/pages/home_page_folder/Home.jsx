import React, { useEffect } from "react";
import PopularHome from "./PopularHome";
import IntroMessage from "./IntroMessage";
import UpgradeToPro from "./UpgradeToPro";
import LatestNews from "./LatestNews";
import RecentStories from "./RecentStories";
import "../../styles/home.css";
import PopularLists from "./PopularLists";
import GetStarted from "../get_started_folder/GetStarted";
import PopularSignout from "../get_started_folder/PopularSignout";

const Home = ({ apiKey, fetchResults, fetchRequest, authStatus }) => {
  useEffect(() => {
    fetchRequest(
      "https://api.themoviedb.org/3/movie/popular?api_key=" + apiKey
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {authStatus ? (
        ""
      ) : (
        <>
          <GetStarted />
        </>
      )}

      <div className="site-body py-5">
        <div className="px-4 flex flex-col md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
          {authStatus ? (
            <>
              <IntroMessage authStatus={authStatus} />
              <PopularHome populars={fetchResults} />
              <UpgradeToPro />
            </>
          ) : (
            <PopularSignout populars={fetchResults} />
          )}
        </div>
        <div className="site-content px-4 flex flex-col md:py-8 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
          <PopularLists populars={fetchResults} />
          <LatestNews />
          <RecentStories />
        </div>
      </div>
    </>
  );
};

export default Home;
