import React, { useEffect, useState } from 'react';
import FavouriteButton from '../../components/movie_actions/FavouriteButton';
import WatchedButton from '../../components/movie_actions/WatchedButton';
import { Link } from 'react-router-dom';
import Loader from '../../components/UI_components/Loader';

const ProfilePoster = ({ movieID, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const movieURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;

    fetch(movieURL)
      .then((res) => res.json())
      .then((movieData) => {
        setMovieData(movieData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [movieID]);
  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <div
          className="hover:border-3 hover:border-h-hov-green relative mb-[2%] rounded border border-solid border-pb-grey/25 shadow-[0_0_1px_1px_rgba(20,24,28,1)] shadow-inner hover:cursor-pointer hover:rounded md:ml-1"
          onMouseEnter={() => setVisibility(true)}
          onMouseLeave={() => setVisibility(false)}
          key={movieData.id}
        >
          <Link to={'/movie/' + movieData.id}>
            <img
              className="block max-h-[120px] max-w-[80px]  rounded border md:max-h-[220px] md:max-w-[140px] "
              src={'https://image.tmdb.org/t/p/w500/' + movieData.poster_path}
              alt={movieData.title}
              loading="lazy"
            />
          </Link>
          {visibility && (
            <div
              className="absolute left-[20%] top-[75%] z-10 flex items-center rounded p-0.5"
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
          )}
        </div>
      )}
    </>
  );
};
export default ProfilePoster;
