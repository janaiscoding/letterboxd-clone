"use client";

import Backdrop from "../../../src/pages/movie/Backdrop";
import MovieDetails from "../../../src/pages/movie/MovieDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/" +
      slug +
      "?api_key=90a83017dcd0ef93c3e5474af9093de9&append_to_response=credits"
  );

  return (
    <div className="movie-body min-h-[80vh] pb-5 md:mx-auto">
      <Backdrop movie={res} />
      <div className="flex flex-col px-4 md:mx-auto md:my-0 md:w-[950px]">
        <MovieDetails movie={res} authStatus={true} setNewDataGained={true} />
      </div>
    </div>
  );
}
