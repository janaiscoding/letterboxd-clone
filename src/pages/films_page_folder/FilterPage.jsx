/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arrays from "./filtering/arrays";
import FilterList from "./FilterList";
import SelectBoxFilterPage from "./SelectBoxFilterPage";

const FilterPage = ({
  apiKey,
  fetchResults,
  fetchRequest,
  setFetchResults,
  setNewDataGained,
}) => {
  const [filterType, setFilterType] = useState("");
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBoxFilterPage
      title={element.type}
      data={element.array}
      key={index}
    />
  ));
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
    }
    if (thisDay < 10) {
      thisDay = "0" + thisDay;
    }
    if (query === "this year") {
      let url =
        "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&language=en-US&year=" +
        thisYear;
      fetchRequest(url);
    } else if (query === "this month") {
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
    }
  };
  // DECIDE WHAT TYPE OF FETCH YOU WANT TO DO
  const getFilterType = () => {
    setFilterType(arrays.find(({ array }) => array.includes(query)).type);
  };
  const fetchByFilterType = () => {
    if (filterType === "genres") {
      fetchByGenre();
    } else if (filterType === "years") {
      fetchByYears();
    } else if (filterType === "ratings") {
      fetchByRating();
    } else if (filterType === "popularity") {
      fetchByPopularity();
    }
  };
  useEffect(() => {
    getFilterType();
    fetchByFilterType();
  }, [query, filterType]);

  //here i perform my api call
  return (
    <div className="site-body py-5">
      <div className=" md:flex md:flex-row px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
        <div className="flex flex-col">
          <div
            className="flex 
      justify-between 
      section-heading 
      text-sh-grey 
      text-xs
      border-b 
      border-solid 
      border-b-grey 
      mb-3"
          >
            <div className="text-sm uppercase">FILMS FILTERED BY {query}</div>
          </div>
          <div className="grid grid-cols-2 md:flex md:flex-row px-4 md:w-[950px] md:my-0 md:mx-auto font-['Graphik']">
            {allSelectionBoxes}
          </div>
          <FilterList
            fetchResults={fetchResults}
            setNewDataGained={setNewDataGained}
            apiKey={apiKey}
            fetchRequest={fetchRequest}
            setFetchResults={setFetchResults}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
