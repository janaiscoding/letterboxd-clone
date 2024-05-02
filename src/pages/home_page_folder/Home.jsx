import React, { useEffect } from 'react';
import PopularHome from './PopularHome';
import IntroMessage from './IntroMessage';
import UpgradeToPro from './UpgradeToPro';
import LatestNews from './LatestNews';
import RecentStories from './RecentStories';
import '../../styles/home.css';
import PopularLists from './PopularLists';
import GetStarted from '../get_started_folder/GetStarted';
import PopularSignout from '../get_started_folder/PopularSignout';
import LetsYou from '../get_started_folder/LetsYou';

const Home = ({ fetchResults, fetchRequest, authStatus, setNewDataGained }) => {
  useEffect(() => {
    fetchRequest(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {authStatus ? (
        ''
      ) : (
        <>
          <GetStarted />
        </>
      )}

      <div className="site-body py-5">
        <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
          {authStatus ? (
            <>
              <IntroMessage authStatus={authStatus} />
              <PopularHome
                populars={fetchResults}
                setNewDataGained={setNewDataGained}
              />
              <UpgradeToPro />
            </>
          ) : (
            <>
              <PopularSignout populars={fetchResults} />
              <LetsYou />
            </>
          )}
        </div>
        <div className="site-content flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
          <PopularLists populars={fetchResults} />
          <LatestNews />
          <RecentStories />
        </div>
      </div>
    </>
  );
};

export default Home;
