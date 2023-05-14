/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import arrays from "../../assets/filtering/arrays";
import { useParams } from "react-router-dom";
import FilterList from "./FilterList";

const FilterPage = ({ apiKey }) => {
  const [filterType, setFilterType] = useState("");
  const [filterResults, setFilterResults] = useState([]);
  const { query } = useParams();

  // DECIDE WHAT TYPE OF FETCH YOU WANT TO DO
  const getFilterType = () => {
    console.log("got filter type");
    setFilterType(arrays.find(({ array }) => array.includes(query)).type);
  };
  // FETCHING THE GENRE LIST => FINDING THE MATCHING WITH MY QUERY GENRE ID => FETCHING MOVIES BY GENRE ID => DISPLAYING
  const fetchByGenre = () => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        apiKey +
        "&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => {
        let genreObj = data.genres.find(({ name }) => name === query);
        fetch(
          "https://api.themoviedb.org/3/discover/movie?api_key=" +
            apiKey +
            "&language=en-US&sort_by=release_date.desc&page=1&with_genres=" +
            genreObj.id
        )
          .then((response) => response.json())
          .then((data) => {
            setFilterResults(data);
          });
      });
  };
  // FETCH BY YEAR IS A SIMPLE DISCOVER
  const fetchByYears = () => {};
  const fetchByRating = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&language=en-US&sort_by=popularity." +
        (query === "Highest First" ? "asc" : "desc")
    )
      .then((response) => response.json())
      .then((data) => {
        setFilterResults(data);
      });
  };
  useEffect(() => {
    //implement a logic for finding which case of query it is so I can filter by better stuff
    getFilterType();
    console.log(filterType);
    if (filterType === "genres") {
      console.log("filtering by genre");
      fetchByGenre();
    } else if (filterType === "years") {
      console.log("filtering by years");
      fetchByYears();
    } else if (filterType === "ratings") {
      console.log("filtering by ratings", query);
      fetchByRating();
    }
  }, [filterType]);

  //here i perform my api call
  return (
    <>
      <h1>
        TEST filter type: {filterType} + {query}
      </h1>
      <FilterList filterResults={filterResults} />
    </>
  );
};

export default FilterPage;
