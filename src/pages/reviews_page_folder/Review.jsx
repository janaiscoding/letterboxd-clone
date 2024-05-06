/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ResultPoster from '../results_page_folder/ResultPoster';

const Review = ({ review, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);
  const [fixedUserURL, setFixedUserURL] = useState('');

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${review.movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Hardcoded fix for the bad demo img when i used the discord CDN :/
    if (review.userURL.includes('discord')) {
      setFixedUserURL(
        'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?q=80&w=3098&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      );
    } else {
      setFixedUserURL(review.userURL);
    }
  }, [review]);

  return (
    <div className="flex justify-between border-t border-solid border-b-grey py-2">
      <div className="flex gap-3">
        <Link to={'/profile/' + review.uid}>
          <img
            src={fixedUserURL}
            width={40}
            height={40}
            className="max-h-[40px] max-w-[40px] rounded-full hover:cursor-pointer"
            alt={'profile picture of' + review.userName}
          />
        </Link>
        <div className="flex flex-col">
          <p className="pb-3 text-sm text-sh-grey">
            Reviewed by{' '}
            <Link
              to={'/profile/' + review.uid}
              className="text-p-white hover:text-hov-blue"
            >
              {review.userName}
            </Link>
          </p>{' '}
          <p className="text-sh-grey">{review.review}</p>
        </div>
      </div>
      <ResultPoster movie={movieData} setNewDataGained={setNewDataGained} />
    </div>
  );
};

export default Review;
