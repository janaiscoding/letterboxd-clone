"use client";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import React, { Usable, use, useEffect, useState } from "react";

import filterOptions from "./filtering/arrays";
import { Filter } from "app/components/Filter/Filter";
import { PopularMovies } from "app/components/Home/PopularMovies";
import { FilterResults } from "app/components/Filter/FilterResults";
import { useRouter } from "next/navigation";
import { Footer } from "app/components/Navigation/Footer";

import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});

  const [isLoading, setIsLoading] = useState(true);
  const [filterResults, setFilterResults] = useState<any[] | null>(null);
  const [popularMovies, setPopularMovies] = useState<any[] | null>(null);

  useEffect(() => {
    const initialFilters: { [key: string]: string } = {};
    for (const [key, value] of searchParams.entries()) {
      initialFilters[key] = value;
    }
    setActiveFilters(initialFilters);
  }, [searchParams]);

  const onSelect = (value: string, title: string) => {
    let updated = { ...activeFilters };

    if (updated[title] === value) {
      delete updated[title];
    } else {
      updated[title] = value;
    }

    const queryString = new URLSearchParams(updated).toString();
    const newUrl = queryString ? `/films?${queryString}` : "/films";
    router.push(newUrl);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(activeFilters).length === 0) {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        const data = await res.json();
        setPopularMovies(data.results);
        setFilterResults(null);
        setIsLoading(false);
        return;
      }

      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&vote_count.gte=100`;

      if (activeFilters.genres) {
        const genreRes = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
        );
        const genreData = await genreRes.json();
        const genreId = genreData.genres.find((gen: any) => gen.name === activeFilters.genres)?.id;
        if (genreId) {
          url += `&with_genres=${genreId}`;
        }
      }

      if (activeFilters.ratings) {
        if (activeFilters.ratings === "Highest First") {
          url += `&sort_by=vote_average.desc`;
        } else if (activeFilters.ratings === "Lowest First") {
          url += `&sort_by=vote_average.asc`;
        }
      }

      if (activeFilters.years) {
        const startYear = parseInt(activeFilters.years.slice(0, -1));
        const endYear = startYear + 9;
        url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
      }

      setIsLoading(true);
      console.log("final url", url);
      try {
        const res = await fetch(url);
        const data = await res.json();
        const filtered = data.results?.filter((m: any) => m.poster_path !== null) || [];
        setFilterResults(filtered);
        setPopularMovies(null);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setFilterResults([]);
        setPopularMovies(null);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [activeFilters]);

  return (
    <>
      <LayoutNavbar />
      <div className="site-body min-h-[80vh] py-5">
        <div className="px-4 font-['Graphik'] md:mx-auto md:my-0 md:flex md:w-[950px] md:flex-col">
          <div className="md:flex md:flex-row">
            <p className="sans-serif block self-center px-4 text-xs uppercase tracking-normal text-sh-grey md:px-0">
              Browse by:
            </p>
            <div className="grid grid-cols-2 md:flex md:flex-row">
              {filterOptions.map((option) => (
                <Filter
                  key={option.title}
                  title={option.title}
                  values={option.values}
                  currentValues={activeFilters[option.title] ? [activeFilters[option.title]] : []}
                  onSelect={onSelect}
                />
              ))}
            </div>
          </div>

          <div className="mb-10 flex items-start justify-between gap-2">
            {Object.keys(activeFilters).length > 0 && (
              <div className="flex flex-col gap-2 text-sh-grey">
                <p className="text-gray-600">Active filters</p>
                <div className="flex flex-col gap-2">
                  {Object.entries(activeFilters).map(([key, value]) => (
                    <span key={key} className="bg-blue-100 text-blue-800 inline-flex items-center rounded-full">
                      {key.substring(0, 1).toUpperCase() + key.substring(1)} : {value}
                      <button onClick={() => onSelect(value, key)} className="text-blue-600 hover:text-blue-800 ml-2">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {Object.keys(activeFilters).length > 0 && (
              <div>
                <button
                  onClick={() => router.push("/films")}
                  className="hover:text-blue-800 text-sh-grey hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {isLoading && <p className="text-base text-sh-grey">Loading..</p>}
          {!isLoading && popularMovies && <PopularMovies movies={popularMovies} />}
          {!isLoading && filterResults && <FilterResults movies={filterResults} />}
        </div>
      </div>
      <Footer />
    </>
  );
}
