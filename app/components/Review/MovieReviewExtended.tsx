import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie, Review, UserReview } from "app/types";

export const MovieReviewExtended = ({
  review,
}: {
  review: UserReview | Review;
}) => {
  const [movie, setMovie] = useState<Movie>();

  const fetchRequestFromAPI = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${review.movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((movie) => {
        setMovie(movie);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchRequestFromAPI();
  }, [review]);

  return (
    <div className="border-b-grey flex border-b border-solid py-2">
      <div className=" hover:border-3 hover:border-h-hov-green border-pb-grey/25  relative  h-fit rounded  border  border-solid  shadow-[0_0_1px_1px_rgba(20,24,28,1)]  shadow-inner hover:cursor-pointer hover:rounded md:ml-1">
        <Link href={"/movie/" + movie?.id}>
          <Image
            className="block max-h-[120px] max-w-[80px] rounded border"
            src={"https://image.tmdb.org/t/p/w500/" + movie?.poster_path}
            alt={"Movie title for" + movie?.title}
            height={300}
            width={300}
            loading="lazy"
          />
        </Link>
      </div>
      <div className="ml-3 w-full">
        <div className="flex items-center justify-between gap-2">
          <Link
            href={"/movie/" + movie?.id}
            className="text-p-white hover:text-hov-blue flex items-start justify-between gap-1 text-base font-bold"
          >
            {movie?.title}
          </Link>
        </div>
        {review?.timestamp && (
          <p className="text-sh-grey text-xs">{review.timestamp}</p>
        )}
        <p className="text-sh-grey pt-2 text-sm">{review.review}</p>
      </div>
    </div>
  );
};
