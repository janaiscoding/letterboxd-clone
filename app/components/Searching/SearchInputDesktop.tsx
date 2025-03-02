import React, { useState } from "react";
import searchInputIcon from "@/assets/searchIcon.png";
import closeIcon from "@/assets/csb.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SearchInputDesktop = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = async (e: any) => {
    if (e.key === "Enter" && query !== "") {
      hideExtendedSearch();
      navigateToResults();
    }
  };

  const onSearch = () => {
    if (query !== "") {
      hideExtendedSearch();
      navigateToResults();
    }
  };

  const navigateToResults = () => {
    router.push("/results?searchTerm=" + query);
    setQuery("");
  };

  const hideExtendedSearch = () => {
    closeSearchBar();
    displaySearchIcon();
  };

  const closeSearchBar = () => {
    const SBD = document.querySelector(".search-bar-desktop");
    SBD?.classList.add("md:hidden");
    setQuery("");
  };

  const displaySearchIcon = () => {
    const SID = document.querySelector(".search-icon-desktop");
    SID?.classList.remove("md:hidden");
    SID?.classList.add("md:block");
  };

  return (
    <div className="ml-2 flex items-center">
      <Image
        className="close-search-icon-desktop hover:cursor-pointer"
        src={closeIcon}
        width={25}
        height={25}
        alt="search icon"
        onClick={hideExtendedSearch}
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
        className="bg-input-bg text-drop-grey h-8 rounded-2xl py-1.5 pl-2.5 pr-7 text-base focus:outline-none md:w-[150px]"
      />
      <Image
        src={searchInputIcon}
        onClick={onSearch}
        width={20}
        height={20}
        alt="icon for searching"
        className="relative left-[-30px] hover:cursor-pointer"
      />
    </div>
  );
};
