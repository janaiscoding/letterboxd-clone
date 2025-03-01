import { GetStarted } from "./GetStarted";
import { PopularMovies } from "./PopularMovies";
import LetsYou from "src/pages/get-started/LetsYou";

export const HomeSignedOut = ({ movies }: { movies: any }) => {
  return (
    <div className="site-body py-5">
      <GetStarted />
      <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
        <PopularMovies movies={movies} />
        <LetsYou />
      </div>
    </div>
  );
};
