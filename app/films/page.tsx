"use client";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import React, { Usable, use, useEffect, useState } from "react";

import filterOptions from "./filtering/arrays";
import { Filter } from "app/components/Filter/Filter";
import { PopularMovies } from "app/components/Home/PopularMovies";
import { FilterResults } from "app/components/Filter/FilterResults";
import { useRouter } from "next/navigation";
import { Footer } from "app/components/Navigation/Footer";

export default function Page({
  searchParams,
}: {
  searchParams: Usable<{ [filter: string]: string }>;
}) {
  const query = use(searchParams);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<any[] | null>();

  const [filter, setFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterResults, setFilteredResults] = useState();

  const fetchPopularMovies = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    if (!res.ok) {
      console.error("error fetching popular movies");
      return;
    }

    const data = await res.json();

    setMovies(data.results);
    setIsLoading(false);
  };

  const onSelect = (filter: string, value: string) => {
    router.push(`/films?${filter}=${value}`);
  };

  const fetchByFilterType = () => {
    if (filter === "genres") {
      fetchByGenre();
    } else if (filter === "years") {
      fetchByYear();
    } else if (filter === "ratings") {
      fetchByRating();
    } else if (filter === "popularity") {
      fetchByPopularity();
    } else {
      // No available filter provided
      setFilter("");
      setFilterValue("");
      fetchPopularMovies();
    }
  };

  const fetchByGenre = () => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
        "&language=en-US"
    )
      .then((response) => response.json())
      .then((data) => {
        let genreObj = data.genres.find(({ name }) => name === filterValue);

        fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
            "&language=en-US&sort_by=release_date.desc&page=1&with_genres=" +
            genreObj?.id +
            "&vote_count.gte=50"
        )
          .then((response) => response.json())
          .then((data) => {
            const validMovieResults = data.results.filter(
              (movie) => movie.poster_path !== null
            );

            setFilteredResults(validMovieResults);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching movies by genre:", err);
            setIsLoading(false);
          });
      });
  };

  const fetchByYear = () => {
    const startYearStr = filterValue.substring(0, filterValue.length - 1); // remove the "s" in the end, i.e. '1950s' = 1950
    let startYear = Number(startYearStr);
    let endYear = startYear + 10;

    let url =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
      "&language=en-US&primary_release_date.gte=" +
      startYear +
      "-01-01&primary_release_date.lte=" +
      endYear +
      "-12-31&vote_count.gte=500";

    fetchAndSetResults(url);
  };

  const fetchByRating = () => {
    let url =
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
      "&language=en-US&sort_by=popularity." +
      (filterValue === "Highest First" ? "desc" : "asc");

    fetchAndSetResults(url);
  };

  const fetchByPopularity = () => {
    const newDate = new Date();
    const thisYear = newDate.getFullYear();

    const thisMonth =
      newDate.getMonth() < 10
        ? `0${newDate.getMonth()}`
        : newDate.getMonth().toString();
    const thisDay =
      newDate.getDay() < 10 ? `0${newDate.getDay()}` : newDate.getDay();

    if (filterValue === "this year") {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
        "&language=en-US&year=" +
        thisYear;
      fetchAndSetResults(url);
    } else if (filterValue === "this month") {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
        "&language=en-US&primary_release_date.gte=" +
        thisYear +
        "-" +
        thisMonth +
        "-01";

      fetchAndSetResults(url);
    } else if (filterValue === "this week") {
      let url =
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}` +
        "&language=en-US&primary_release_date.gte=" +
        thisYear +
        "-" +
        thisMonth +
        "-" +
        thisDay;

      fetchAndSetResults(url);
    }
  };

  const fetchAndSetResults = (url: string) => {
    setIsLoading(true);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const validMovieResults = data.results.filter(
          (movie) => movie.poster_path !== null
        );

        setFilteredResults(validMovieResults);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movies:", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    for (const [key, value] of Object.entries(query)) {
      setFilter(key);
      setFilterValue(value);
    }

    if (!Object.keys(query).length) {
      fetchPopularMovies();
    }
  }, [query]);

  useEffect(() => {
    if (filter && filterValue) {
      fetchByFilterType();
    }
  }, [filter, filterValue]);

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
              {filterOptions.map((option, index) => (
                <Filter
                  title={option.title}
                  values={option.values}
                  key={index}
                  onSelect={(value) => onSelect(option.title, value)}
                />
              ))}
            </div>
          </div>

          {isLoading && <p className="text-sh-grey text-base">Loading..</p>}
          {!isLoading && movies && !filterResults && (
            <PopularMovies movies={movies} />
          )}

          {filterResults && (
            <FilterResults
              filter={filter}
              filterValue={filterValue}
              movies={filterResults}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
