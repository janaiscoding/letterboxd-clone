/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import arrays from "./filtering/arrays";
import { useParams } from "react-router-dom";
import FilterList from "./FilterList";
const FilterPage = ({
  apiKey,
  fetchResults,
  fetchRequest,
  setFetchResults,
}) => {
  const [filterType, setFilterType] = useState("");
  const { query } = useParams();

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
            setFetchResults(data);
          });
      });
  };
  // FETCH BY YEAR IS A SIMPLE DISCOVER
  const fetchByYears = () => {
    let queryNumStart = Number(query.substring(0, query.length - 1));
    let queryNumEnd = queryNumStart + 10;
    let url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      apiKey +
      "&language=en-US&primary_release_date.gte=" +
      queryNumStart +
      "-01-01&primary_release_date.lte=" +
      queryNumEnd +
      "-12-31&vote_count.gte=500";
    fetchRequest(url);
  };

  const fetchByRating = () => {
    let url =
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
      apiKey +
      "&language=en-US&sort_by=popularity." +
      (query === "Highest First" ? "desc" : "asc");
    fetchRequest(url);
  };
  const fetchByPopularity = () => {
    const newDate = new Date();
    const thisYear = newDate.getFullYear();
    let thisMonth = newDate.getMonth();
    let thisDay = newDate.getDay();
    if (thisMonth < 10) {
      thisMonth = "0" + thisMonth;
      console.log(thisMonth);
    }
    if (thisDay < 10) {
      thisDay = "0" + thisDay;
      console.log(thisDay);
    }
    if (query === "this year") {
      console.log(query, "fetching this year", thisYear);
      let url =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&language=en-US&year=" +
        thisYear;
      fetchRequest(url);
    } else if (query === "this month") {
      console.log(query, "fetching this month", thisMonth);
      let url =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&language=en-US&primary_release_date.gte=" +
        thisYear +
        "-" +
        thisMonth +
        "-01";
      fetchRequest(url);
    } else if (query === "this week") {
      console.log(query, "fetching this month", thisMonth);
      let url =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&language=en-US&primary_release_date.gte=" +
        thisYear +
        "-" +
        thisMonth +
        "-" +
        thisDay;
      fetchRequest(url);
    } else if (query === "all time") {
      console.log("no idea how to do this");
    }
  };
  // DECIDE WHAT TYPE OF FETCH YOU WANT TO DO
  const getFilterType = () => {
    console.log("got filter type");
    setFilterType(arrays.find(({ array }) => array.includes(query)).type);
  };
  const fetchByFilterType = () => {
    if (filterType === "genres") {
      console.log("filtering by genre");
      fetchByGenre();
    } else if (filterType === "years") {
      console.log("filtering by years");
      fetchByYears();
    } else if (filterType === "ratings") {
      console.log("filtering by ratings", query);
      fetchByRating();
    } else if (filterType === "popularity") {
      console.log("filtering by popularity", query);
      fetchByPopularity();
    }
  };
  useEffect(() => {
    getFilterType();
    fetchByFilterType();
  }, [filterType]);

  //here i perform my api call
  return (
    <>
      <h1>
        TEST filter type: {filterType} + {query}
      </h1>
      <FilterList fetchResults={fetchResults} />
    </>
  );
};

export default FilterPage;
