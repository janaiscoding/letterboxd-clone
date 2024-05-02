import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchInputIcon from './searchinput.png';
import closeIcon from './csb.png';
const SearchInputDesktop = ({ fetchRequest, setNewDataGained }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query !== '') {
      const SBD = document.querySelector('.search-bar-desktop');
      SBD.classList.add('md:hidden');
      const SID = document.querySelector('.search-icon-desktop');

      SID.classList.remove('md:hidden');
      SID.classList.add('md:block');
      //fetch first
      fetchRequest(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      //setting that new data was gained to refresh results page
      setNewDataGained(true);
      navigate('/results/' + query);
      setQuery('');
    }
  };
  const handleSearchDesktop = () => {
    if (query !== '') {
      const SBD = document.querySelector('.search-bar-desktop');
      SBD.classList.add('md:hidden');
      const SID = document.querySelector('.search-icon-desktop');

      SID.classList.remove('md:hidden');
      SID.classList.add('md:block');
      //fetch first
      fetchRequest(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      //setting that new data was gained to refresh results page
      setNewDataGained(true);
      navigate('/results/' + query);
      setQuery('');
    }
  };
  const closeSearchDeskop = () => {
    //the x button is hidden now
    const CSD = document.querySelector('.close-search-icon-desktop');
    CSD.classList.remove('md:block');
    CSD.classList.add('md:hidden');
    //display the search icon again
    const SIID = document.querySelector('.search-icon-desktop');
    SIID.classList.remove('md:hidden');
    SIID.classList.add('md:block');
    // hide the input field
    const SBD = document.querySelector('.search-bar-desktop');
    SBD.classList.add('md:hidden');
  };

  // let allResponses = movieData.map((movie) => <div>{movie.title}</div>);
  return (
    <div className="ml-2 flex items-center">
      <img
        className="close-search-icon-desktop hidden hover:cursor-pointer md:hidden"
        src={closeIcon}
        width={25}
        height={25}
        alt="search icon"
        onClick={closeSearchDeskop}
      />
      <label htmlFor="search" className="hidden">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="
        h-8
        rounded-2xl
        bg-if-blue
        py-1.5
        pl-2.5
        pr-7
        text-base
        text-drop-grey
        focus:outline-none
        md:w-[150px]
        "
      />
      <img
        src={searchInputIcon}
        onClick={handleSearchDesktop}
        width={20}
        height={20}
        alt="icon for searching"
        className="
              relative 
              left-[-30px]
              hover:cursor-pointer
        "
      />
    </div>
  );
};
export default SearchInputDesktop;
