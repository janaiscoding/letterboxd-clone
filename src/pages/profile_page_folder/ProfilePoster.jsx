import React, { useEffect, useState } from "react";
import FavouriteButton from "../../components/movie_actions/FavouriteButton";
import WatchedButton from "../../components/movie_actions/WatchedButton";
import { Link } from "react-router-dom";

const ProfilePoster = ({ movieID, apiKey, setNewDataGained }) => {
  const [movieData, setMovieData] = useState([]);
  const [visibility, setVisibility] = useState(false);

  const fetchRequestFromAPI = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/" + movieID + "?api_key=" + apiKey,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
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
    <>
      <div
        className="w-[32.33%] 
    mb-[2%]
    border 
    border-solid 
    rounded 
    border-pb-grey/25
    shadow-inner 
    shadow-[0_0_1px_1px_rgba(20,24,28,1)] 
    hover:cursor-pointer 
    hover:border-3 
    hover:border-h-hov-green
    hover:rounded
    md:ml-1
    relative
    "
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
        key={movieData.id}
      >
        <Link to={"/movie/" + movieData.id}>
          <img
            className="border rounded block "
            src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
            alt={movieData.title}
          />
        </Link>
        {visibility ? (
          <div
            className="
        rounded
        absolute
        flex 
        items-center
        p-0.5
        top-[80%]     
        left-[25%]   
        z-10
        "
            style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
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
          " "
        )}
      </div>
    </>
  );
};
export default ProfilePoster;
