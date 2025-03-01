import React from "react";
import { IntroMessage } from "./IntroMessage";
import { PopularMovies } from "./PopularMovies";
import { UpgradeToPro } from "./UpgradeToPro";

export const Home = ({ popular, user }: { popular: any; user: any }) => {
  return (
    <div className="site-body py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <IntroMessage user={user} />
        <PopularMovies movies={popular} />
        <UpgradeToPro />
      </div>
      <div className="site-content flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
        {/* <PopularLists />
          <LatestNews />
          <RecentStories /> */}
      </div>
    </div>
  );
};
