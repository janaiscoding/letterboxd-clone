import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavouriteButton from '../../components/movie_actions/FavouriteButton';
import WatchedButton from '../../components/movie_actions/WatchedButton';

const UserProfileReview = ({ movieID, review, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [movieYear, setMovieYear] = useState();

  const fetchRequestFromAPI = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setMovieYear(data.release_date.substring(0, 4));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    fetchRequestFromAPI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieID]);
  return (
    <div
      className="flex 
    border-b 
    border-solid 
    border-b-grey
    py-2 "
    >
      <div
        className="
        hover:border-3
        hover:border-h-hov-green
        relative 
        h-fit 
        rounded
        border 
        border-solid 
        border-pb-grey/25 
        shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
        shadow-inner
        hover:cursor-pointer
        hover:rounded
        md:ml-1
    "
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        key={movieData.id}
      >
        <Link to={'/movie/' + movieData.id}>
          <img
            className="block max-h-[120px] max-w-[80px] rounded border"
            src={'https://image.tmdb.org/t/p/w500/' + movieData.poster_path}
            alt={movieData.title}
            height={150}
            loading="lazy"
          />
        </Link>
        {visibility ? (
          <div
            className="
            absolute
            left-[6%]
            top-[70%] 
            z-10
            flex
            items-center     
            rounded   
            p-0.5"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <FavouriteButton
              movie={movieData}
              setNewDataGained={setNewDataGained}
            />
            <WatchedButton
              movie={movieData}
              setNewDataGained={setNewDataGained}
            />
          </div>
        ) : (
          ' '
        )}
      </div>
      <div className="ml-3 ">
        <Link
          to={'/movie/' + movieData.id}
          className="text-xl font-bold text-p-white hover:text-hov-blue "
        >
          {' '}
          {movieData.title}{' '}
          <span className="text-base font-normal text-sh-grey">
            {movieYear}
          </span>
        </Link>
        <p className="pt-2 text-sm text-sh-grey">{review}</p>
      </div>
    </div>
  );
};
export default UserProfileReview;
