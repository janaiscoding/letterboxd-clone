import Link from "next/link";
import { PopularMoviePoster } from "../Home/PopularMoviePoster";

export const FilterResults = ({
  filter,
  filterValue,
  movies,
}: {
  filter: string;
  filterValue: string;
  movies: any[];
}) => {
  return (
    <div className="w-full font-['Graphik'] md:mx-auto md:my-0 md:flex md:flex-row">
      <div className="flex w-full flex-col">
        <div className="section-heading border-b-grey text-sh-grey flexjustify-between mb-3 border-b border-solid text-xs">
          <div className="text-sm">
            Movie results in {filter} {filterValue}
          </div>
        </div>

        <div>
          {movies.length === 0
            ? "no movies found for this filtered search"
            : movies.map((movie) => (
                <div
                  key={movie.id}
                  className="border-b-grey my-2 flex flex-col gap-4 border-b border-solid pb-2 md:flex-row"
                >
                  <div className="min-w-[150px] max-w-[150px]">
                    <PopularMoviePoster movie={movie} compact={false} />
                  </div>
                  <div className="flex flex-col">
                    <Link
                      href={"/movie/" + movie.id}
                      className="text-p-white text-xl font-bold"
                    >
                      {movie.title}
                    </Link>
                    <div className="flex">
                      <p className="text-normal text-sh-grey">
                        {movie.overview}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};
