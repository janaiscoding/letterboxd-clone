import React, { useEffect, useState } from "react";
import jobsArray from "./assets/jobs";

const MoviePanels = ({ movie }) => {
  const [cast, setCast] = useState([]);

  // all jobs
  const [directors, setDirectors] = useState([]);
  const [addDir, setAddDirectors] = useState([]);
  const [execDir, setExecutives] = useState([]);
  const [writers, setWriters] = useState([]);
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
      setAddDirectors(
        crew.filter(
          ({ job }) =>
            job === "First Assistant Director" ||
            job === "Second Assistant Director"
        )
      );
      setExecutives(crew.filter(({ job }) => job === "Executive Producer"));
      setWriters(crew.filter(({ job }) => job === "Writer"));
    }
  };
  const getGenres = () => {
    if (movie.genres !== undefined) {
      let tempArray = [];
      movie.genres.forEach((g) => {
        tempArray.push(g.name);
      });
      setGenres(tempArray);
    }
  };

  useEffect(() => {
    getCast();
    getJobs();
    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
  return (
    <>
      <div className="flex flex-col gap-2">
        <p
          className="
      border-b 
      border-solid 
      border-b-grey 
      text-p-white
      hover:cursor-pointer"
        >
          CAST
        </p>
        <div className="flex flex-wrap gap-1">
          {cast.length > 0
            ? cast.map((actor, index) => (
                <p
                  key={index}
                  className="text-sh-grey max-w-full text-center rounded text-xs p-1 bg-c-grey hover:cursor-pointer hover:text-p-white"
                >
                  {actor}
                </p>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};
export default MoviePanels;
