import React, { useState } from "react";
import searchInputIcon from "@/assets/searchIcon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SearchInputMobile = () => {
  const [query, setQuery] = useState("");

  const router = useRouter();

  const onSearch = () => {
    if (query !== "") {
      router.push("/results?searchTerm=" + query);
    }
    setQuery("");
  };

  return (
    <div className="search-bar-mobile bg-h-blue active absolute left-0 top-[2.3rem] z-50 flex w-full p-4">
      <label htmlFor="search" className="hidden">
        Search:
      </label>
      <input
        id="search"
        type="text"
        className="bg-input-bg text-drop-grey h-9 w-full rounded py-1.5 pl-2.5 pr-8 text-base focus:bg-white focus:outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Image
        src={searchInputIcon}
        onClick={onSearch}
        width={40}
        height={40}
        className="absolute left-[85%]"
        alt="search icon"
        aria-label="press this search icon for performing a new search"
      />
    </div>
  );
};
