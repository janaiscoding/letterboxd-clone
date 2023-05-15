import React, { useEffect, useState } from "react";

const ProfilePoster = ({ movieID, apiKey }) => {
  const [movieData, setMovieData] = useState([]);

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
      <div> {movieData.title}</div>
      <img
        src={"https://image.tmdb.org/t/p/w500/" + movieData.poster_path}
        width={100}
        alt={movieData.title}
      />
    </>
  );
};
export default ProfilePoster;
