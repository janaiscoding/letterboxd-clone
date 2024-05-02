/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResultPoster from '../results_page_folder/ResultPoster';

const SingularReview = ({ review, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.themoviedb.org/3/movie/' +
        review.movieID +
        '?api_key=90a83017dcd0ef93c3e5474af9093de9',
      {
        method: 'GET',
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
    <div className="flex justify-between border-t border-solid border-b-grey py-2">
      <div className="flex gap-3">
        <Link to={'/profile/' + review.uid}>
          <img
            src={review.userURL}
            width={40}
            height={40}
            className="max-h-[40px] max-w-[40px] rounded-full hover:cursor-pointer"
            alt={review.userName + `review`}
          />
        </Link>
        <div className="flex flex-col">
          <p className="pb-3 text-sm text-sh-grey">
            Reviewed by{' '}
            <Link
              to={'/profile/' + review.uid}
              className="text-p-white hover:text-hov-blue"
            >
              {review.userName}{' '}
            </Link>
          </p>{' '}
          <p className="text-sh-grey">{review.review}</p>
        </div>
      </div>
      <ResultPoster movie={movieData} setNewDataGained={setNewDataGained} />
    </div>
  );
};

export default SingularReview;
