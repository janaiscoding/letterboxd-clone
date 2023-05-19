import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Link } from "react-router-dom";
import JournalReview from "./JournalReview";

const Journal = ({ apiKey, setNewDataGained }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviewsfromDB = async () => {
    const moviesSnap = await getDocs(collection(db, "movies"));
    let tempArray = [];
    moviesSnap.forEach((doc) => {
      const movieReviews = doc.data().reviews;
      movieReviews.forEach((review) => {
        tempArray.push(review);
      });
    });
    setReviews(tempArray);
  };
  useEffect(() => {
    fetchReviewsfromDB();
  }, []);
  return (
    <div className="site-body py-5 min-h-[80vh]">
      <div className="flex flex-col px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div
          className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      mb-3"
        >
          <Link to="/members/" className="text-sm hover:text-hov-blue">
            REVIEWS OF CLONNERBOXD
          </Link>
        </div>
        <div>
          {reviews.slice().reverse().map((review, index) => (
            <JournalReview
              key={index}
              review={review}
              setNewDataGained={setNewDataGained}
              apiKey={apiKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Journal;
