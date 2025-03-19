"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { db } from "app/firebase/firebase";
import { Review } from "app/types";
import { Footer } from "app/components/Navigation/Footer";
import { MovieReviewExtended } from "app/components/Review/MovieReviewExtended";
import { MovieReviewCompact } from "app/components/Review/MovieReviewCompact";
import Link from "next/link";
import Image from "next/image";
import { SkeletonLoaderReview } from "app/components/Review/SkeletonLoaderReview";

// @to-do infinite scrolling
// @to-do sort by user, movie, etc..
// @to-do maybeeee accordions based on users?
export default function Page() {
  const numberOfReviewsPerLoad = 6;
  const [isLoadingMoreReviews, setIsLoadingMoreReviews] = useState(false);

  const [movieMap, setMovieMap] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);

  const fetchAllReviews = async () => {
    const movieDocs = await getDocs(collection(db, "movies"));
    const reviews = movieDocs.docs.flatMap(
      (doc) => doc.data().reviews
    ) as Review[];

    const sorted = reviews.sort(
      (a, b) => toDate(b?.timestamp).getTime() - toDate(a?.timestamp).getTime()
    );

    const movieIds = [...new Set(reviews.map((review) => review.movieID))];

    setAllReviews(sorted);
    // initial 6 reviews
    setReviews([...sorted].slice(0, numberOfReviewsPerLoad));

    setIsLoading(false);

    fetchMoviesDetails(movieIds);
  };

  const fetchMoviesDetails = async (movieIds: number[]) => {
    setIsLoading(true);
    try {
      const movieData = await Promise.all(
        movieIds.map(async (id) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits`
          );
          if (!res.ok) {
            throw new Error(`Failed to fetch movie with ID: ${id}`);
          }
          const data = await res.json();
          return { id, data };
        })
      );

      // Store the movie details in the state
      const movieMap: { [key: number]: any } = {};
      movieData.forEach(({ id, data }) => {
        movieMap[id] = data;
      });

      setMovieMap(movieMap);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setIsLoading(false);
    }
  };

  const toDate = (timestamp: string | undefined) => {
    if (!timestamp) return new Date(0);

    const [day, month, year] = timestamp.split(".");
    return new Date(`${year}-${month}-${day}`);
  };

  const loadMoreReviews = () => {
    if (reviews.length >= allReviews.length) {
      setIsLoadingMoreReviews(false);
      return;
    }

    setIsLoadingMoreReviews(true);

    const appendedReviews: Review[] = [
      ...reviews,
      ...allReviews.slice(reviews.length, reviews.length + 6),
    ];

    setTimeout(() => {
      setReviews(appendedReviews);
      setIsLoadingMoreReviews(false);
    }, 500);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = window.scrollY + window.innerHeight;
      const triggerScrollingHeight =
        document.documentElement.scrollHeight -
        (10 * document.documentElement.scrollHeight) / 100;

      if (totalHeight >= triggerScrollingHeight) {
        loadMoreReviews();
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [reviews, allReviews]);

  return (
    <>
      <LayoutNavbar />
      <div className="site-body pt-5">
        <div className="flex min-h-[80vh] flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
          <div className="border-b-grey text-sh-grey mb-3 flex justify-between border-b border-solid text-sm">
            <p>REVIEWS OF CLONNERBOXD</p>

            {isLoading && <p className="text-sh-grey text-base">Loading...</p>}
            {!isLoading && (
              <p className="text-sh-grey text-base">
                {allReviews.length} total reviews
              </p>
            )}
          </div>

          {isLoading && (
            <div>
              <SkeletonLoaderReview />
              <SkeletonLoaderReview />
              <SkeletonLoaderReview />
              <SkeletonLoaderReview />
            </div>
          )}

          {!isLoading && !reviews.length && <p>No reviews yet, go post one!</p>}

          {!isLoading && reviews.length && (
            <div className="infinite-scroll">
              {reviews.map((review, i) => (
                <div
                  className="border-sh-grey/10 bg-review-bg/30 my-2 flex w-full justify-between gap-4 rounded-md border border-solid p-2"
                  key={i}
                >
                  <MovieReviewCompact review={review} key={i} />

                  {movieMap[review.movieID] && (
                    <div className="flex flex-col items-end justify-end">
                      <Link
                        href={"/movie/" + review.movieID}
                        className="text-sh-grey hover:text-hov-blue pb-2"
                      >
                        {movieMap[review.movieID].title}
                      </Link>
                      <Link href={"/movie/" + review.movieID}>
                        <Image
                          className="block max-h-[120px] max-w-[80px] rounded border"
                          src={
                            "https://image.tmdb.org/t/p/w500/" +
                            movieMap[review.movieID]?.poster_path
                          }
                          alt={
                            "Movie title for" + movieMap[review.movieID]?.title
                          }
                          height={300}
                          width={300}
                          loading="lazy"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {isLoadingMoreReviews && (
                <div className="loading-dots__wrapper">
                  <div className="loading-dots"></div>
                </div>
              )}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
