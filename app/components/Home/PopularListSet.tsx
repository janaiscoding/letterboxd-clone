import { PopularListPoster } from "./PopularListPoster";

export const PopularListSet = ({
  movies,
  start,
  end,
}: {
  movies: any;
  start: number;
  end: number;
}) => {
  return (
    <div className={`${start !== 1 && "hidden"} md:block`}>
      <div className="hover:border-3 border-pb-grey/25 hover:border-pb-grey flex w-auto overflow-hidden rounded border border-solid shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner hover:cursor-pointer hover:rounded md:h-[105px] md:w-[275px]">
        {movies.map((movie, i) => (
          <PopularListPoster key={i} movie={movie} i={i} />
        ))}
      </div>
      <p className="text-pb-grey hover:text-sh-grey mt-1 text-sm  font-bold hover:cursor-pointer">
        List of movies currently rank {start}-{end}
      </p>
    </div>
  );
};
