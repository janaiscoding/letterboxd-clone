"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { db } from "firebase/firebase";
import { Review } from "app/types";
import { MovieReview } from "app/components/Movie/MovieReview";

// @to-do infinite scrolling
// @to-do sort by user, movie, etc..
// @to-do maybeeee accordions based on users?
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchAllReviews = async () => {
    const movieDocs = await getDocs(collection(db, "movies"));
    const reviews = movieDocs.docs.flatMap((doc) => doc.data().reviews);

    setReviews(reviews);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <>
      <LayoutNavbar />
      <div className="site-body min-h-[80vh] py-5">
        <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px]">
          <div className="section-heading text-sh-grey mb-3 flex justify-between text-xs">
            <p>REVIEWS OF CLONNERBOXD</p>
            {!isLoading && <p>{reviews.length} total reviews</p>}
          </div>
          {isLoading && <p>Loading reviews...</p>}

          {!isLoading && !reviews.length && <p>No reviews yet, go post one!</p>}

          {!isLoading &&
            reviews.length &&
            reviews.map((review, i) => <MovieReview review={review} key={i} />)}
        </div>
      </div>
    </>
  );
}
