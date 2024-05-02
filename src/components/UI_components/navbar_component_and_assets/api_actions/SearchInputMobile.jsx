import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../navbar_assets/searchIcon.png';
import '../../../../styles/modals.css';

const SearchInputMobile = ({
  fetchRequest,
  setNewDataGained,
  searchMobOpen,
  setSearchMobOpen,
  searchBarRef,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchMobile = () => {
    if (query !== '') {
      fetchRequest(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
      );
      setNewDataGained(true);
      navigate('/results/' + query);
    }
    setQuery('');
    setSearchMobOpen(false);
  };
  useEffect(() => {
    let handler = (e) => {
      if (!searchBarRef.current.contains(e.target)) {
        setSearchMobOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div
      className={`search-bar-mobile absolute left-0 top-[2.3rem] z-50 flex w-full bg-h-blue p-4 ${
        searchMobOpen ? 'active' : 'inactive'
      }`}
    >
      <label htmlFor="search" className="hidden">
        Search:
      </label>
      <input
        id="search"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
        focus:bg-white
        h-9
        w-full
        rounded
        bg-if-blue
        py-1.5
        pl-2.5
        pr-8
        text-base
        text-drop-grey
        focus:outline-none
        "
      />
      <img
        src={searchIcon}
        onClick={handleSearchMobile}
        width={40}
        height={40}
        className="absolute left-[85%]"
        alt="press the search icon to perform your search"
      />
    </div>
  );
};
export default SearchInputMobile;
