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

    if (title === "popularity") {
      if (updated[title] === value) {
        updated = {};
      } else {
        updated = { [title]: value };
      }
    } else {
      if (updated[title] === value) {
        delete updated[title];
      } else {
        updated[title] = value;
      }
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

      if (activeFilters.popularity) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        if (activeFilters.popularity === "this year") {
          url += `&year=${year}&sort_by=popularity.desc`;
        } else if (activeFilters.popularity === "this month") {
          const lastDayOfMonth = new Date(year, now.getMonth() + 1, 0).getDate();
          url += `&primary_release_date.gte=${year}-${month}-01&primary_release_date.lte=${year}-${month}-${lastDayOfMonth}&sort_by=popularity.desc`;
        } else if (activeFilters.popularity === "this week") {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          const weekAgoYear = weekAgo.getFullYear();
          const weekAgoMonth = String(weekAgo.getMonth() + 1).padStart(2, "0");
          const weekAgoDay = String(weekAgo.getDate()).padStart(2, "0");
          url += `&primary_release_date.gte=${weekAgoYear}-${weekAgoMonth}-${weekAgoDay}&primary_release_date.lte=${year}-${month}-${day}&sort_by=popularity.desc`;
        }
      }

      setIsLoading(true);
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
          <div className="mb-10 md:flex md:flex-row">
            <p className="sans-serif text-sh-grey block self-center px-4 text-xs uppercase tracking-normal md:px-0">
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

          {Object.keys(activeFilters).length > 0 && (
            <div className="mb-6">
              <button
                onClick={() => router.push("/films")}className="text-sm text-blue-600 hover:text-blue-800 underline"
              >Clear all filters
              </button>
            </div>
          )}

          {Object.keys(activeFilters).length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Active filters:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(activeFilters).map(([key, value]) => (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    {key}: {value}
                    <button onClick={() => onSelect(value, key)} className="ml-2 text-blue-600 hover:text-blue-800">
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && <p className="text-sh-grey text-base">Loading..</p>}
          {!isLoading && popularMovies && <PopularMovies movies={popularMovies} />}
          {!isLoading && filterResults && (
            <FilterResults
              filter={Object.keys(activeFilters).join(", ")}
              filterValue={Object.values(activeFilters).join(", ")}
              movies={filterResults}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
