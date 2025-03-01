import React from "react";
import { IntroMessage } from "./IntroMessage";
import { PopularMovies } from "./PopularMovies";
import { UpgradeToPro } from "./UpgradeToPro";
import { PopularLists } from "./PopularLists";
import { LatestNews } from "./LatestNews";
import { RecentStories } from "../Stories/RecentStories";

export const Home = ({ movies, user }: { movies: any; user: any }) => {
  return (
    <div className="site-body py-5">
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <IntroMessage user={user} />
        <PopularMovies movies={movies} />
        <UpgradeToPro />
      </div>
      <div className="site-content flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
        <PopularLists movies={movies} />
        <LatestNews />
        <RecentStories />
      </div>
    </div>
  );
};
