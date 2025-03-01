import { LetsYou } from "../LetsYou/LetsYou";
import { RecentStories } from "../Stories/RecentStories";
import { GetStarted } from "./GetStarted";
import { LatestNews } from "./LatestNews";
import { PopularLists } from "./PopularLists";
import { PopularMovies } from "./PopularMovies";

export const HomeSignedOut = ({ movies }: { movies: any }) => {
  return (
    <div className="site-body py-5">
      <GetStarted />
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <PopularMovies movies={movies} />
        <LetsYou />
      </div>

      <div className="site-content flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
        <PopularLists movies={movies} />
        <LatestNews />
        <RecentStories />
      </div>
    </div>
  );
};
