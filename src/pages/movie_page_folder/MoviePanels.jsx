import React, { useEffect, useState } from "react";
import jobsArray from "./assets/jobs";

const MoviePanels = ({ movie }) => {
  const [cast, setCast] = useState([]);

  const [directors, setDirectors] = useState([]);
  const [addDir, setAddDirectors] = useState([]);
  const [details, setDetails] = useState([]);
  const [genres, setGenres] = useState([]);
  const getCast = () => {
    if (movie.credits !== undefined) {
      const castFirsts = movie.credits.cast.filter((A, index) => index < 15);
      let tempArray = [];
      castFirsts.map((actor) => {
        tempArray.push(actor.name);
      });
      setCast(tempArray);
    }
  };
  const getJobs = () => {
    if (movie.credits !== undefined) {
      const crew = movie.credits.crew;
      setDirectors(crew.find(({ job }) => job === "Director"));
      console.log(crew.find(({ department }) => department === "Directing"));
    }
  };
  useEffect(() => {
    getCast();
    getJobs();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return <>{cast.length > 0 ? cast.map((actor) => <p>{actor}</p>) : ""}</>;
};
export default MoviePanels;
