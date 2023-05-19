import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ResultPoster from "../results_page_folder/ResultPoster";

const JournalReview = ({ review, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/502356?api_key=90a83017dcd0ef93c3e5474af9093de9",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setNewDataGained(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [review.movieID]);
  return (
    <div className="flex gap-3 py-2 border-t border-solid border-b-grey">
      <Link to={"/profile/" + review.uid}>
        <img
          src={review.userURL}
          width={40}
          height={40}
          className="rounded-[20px] max-h-[40px] hover:cursor-pointer"
          alt={review.userName + `review`}
        />
      </Link>
      <div className="flex flex-col">
        <p className="text-sm text-sh-grey pb-3">
          Reviewed by{" "}
          <Link
            to={"/profile/" + review.uid}
            className="text-p-white hover:text-hov-blue"
          >
            {review.userName}{" "}
          </Link>
        </p>{" "}
        <p className="text-sh-grey">{review.review}</p>
      </div>
      <ResultPoster movie={movieData} setNewDataGained={setNewDataGained} />
    </div>
  );
};

export default JournalReview;
