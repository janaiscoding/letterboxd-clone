/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import arrays from './filtering/arrays';
import FilterList from './FilterList';
import SelectBoxFilterPage from './SelectBoxFilterPage';

const FilterPage = ({
  fetchResults,
  fetchRequest,
  setFetchResults,
  setNewDataGained,
}) => {
  const [filterType, setFilterType] = useState('');
  const allSelectionBoxes = arrays.map((element, index) => (
    <SelectBoxFilterPage
      title={element.type}
      data={element.array}
      key={index}
    />
  ));
  let { query } = useParams();

  // FETCHING THE GENRE LIST => FINDING THE MATCHING WITH MY QUERY GENRE ID => FETCHING MOVIES BY GENRE ID => DISPLAYING
  const fetchByGenre = () => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
        '&language=en-US'
    )
      .then((response) => response.json())
      .then((data) => {
        let genreObj = data.genres.find(({ name }) => name === query);
        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
            '&language=en-US&sort_by=release_date.desc&page=1&with_genres=' +
            genreObj.id +
            '&vote_count.gte=50'
        )
          .then((response) => response.json())
          .then((data) => {
            setFetchResults(data);
          })
          .catch((err) => {
            console.log(err);
          });
      });
  };
  // FETCH BY YEAR IS A SIMPLE DISCOVER
  const fetchByYears = () => {
    let queryNumStart = Number(query.substring(0, query.length - 1));
    let queryNumEnd = queryNumStart + 10;
    let url =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
      '&language=en-US&primary_release_date.gte=' +
      queryNumStart +
      '-01-01&primary_release_date.lte=' +
      queryNumEnd +
      '-12-31&vote_count.gte=500';
    fetchRequest(url);
  };

  const fetchByRating = () => {
    let url =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
      '&language=en-US&sort_by=popularity.' +
      (query === 'Highest First' ? 'desc' : 'asc');
    fetchRequest(url);
  };
  const fetchByPopularity = () => {
    const newDate = new Date();
    const thisYear = newDate.getFullYear();
    let thisMonth = newDate.getMonth();
    let thisDay = newDate.getDay();
    if (thisMonth < 10) {
      thisMonth = '0' + thisMonth;
    }
    if (thisDay < 10) {
      thisDay = '0' + thisDay;
    }
    if (query === 'this year') {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
        '&language=en-US&year=' +
        thisYear;
      fetchRequest(url);
    } else if (query === 'this month') {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
        '&language=en-US&primary_release_date.gte=' +
        thisYear +
        '-' +
        thisMonth +
        '-01';
      fetchRequest(url);
    } else if (query === 'this week') {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}` +
        '&language=en-US&primary_release_date.gte=' +
        thisYear +
        '-' +
        thisMonth +
        '-' +
        thisDay;
      fetchRequest(url);
    }
  };
  // DECIDE WHAT TYPE OF FETCH YOU WANT TO DO (and if it exists)
  const getFilterType = () => {
    setFilterType(arrays.find(({ array }) => array.includes(query)).type);
  };
  const fetchByFilterType = () => {
    if (filterType === 'genres') {
      fetchByGenre();
    } else if (filterType === 'years') {
      fetchByYears();
    } else if (filterType === 'ratings') {
      fetchByRating();
    } else if (filterType === 'popularity') {
      fetchByPopularity();
    }
  };
  useEffect(() => {
    getFilterType();
    fetchByFilterType();
  }, [query, filterType]);

  //here i perform my api call
  return (
    <div className="site-body min-h-[80vh] py-5">
      <div className=" px-4 font-['Graphik'] md:mx-auto md:my-0 md:flex md:w-[950px] md:flex-row">
        <div className="flex flex-col">
          <div
            className="section-heading 
      mb-3 
      flex 
      justify-between 
      border-b
      border-solid 
      border-b-grey 
      text-xs 
      text-sh-grey"
          >
            <div className="text-sm uppercase">FILMS FILTERED BY {query}</div>
          </div>
          <div className="grid grid-cols-2 px-4 font-['Graphik'] md:mx-auto md:my-0 md:flex md:w-[950px] md:flex-row">
            {allSelectionBoxes}
          </div>
          <FilterList
            fetchResults={fetchResults}
            setNewDataGained={setNewDataGained}
            fetchRequest={fetchRequest}
            setFetchResults={setFetchResults}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
