"use client";

import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import React, { Usable, use, useEffect, useState } from "react";
import { FilterResults } from "app/components/Filter/FilterResults";
import { Footer } from "app/components/Navigation/Footer";

export default function Page({ searchParams }: { searchParams: any }) {
  const query = use(searchParams);

  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState<any[] | null>();

  const fetchMoviesBySearchTerm = async () => {
    setIsLoading(true);

    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${searchTerm}`
    );

    if (!res.ok) {
      console.error("error fetching movies with your search term");
      setIsLoading(false);
      return;
    }

    const data = await res.json();

    // skip those that don't have an image
    const validMovieResults = data.results.filter((movie) => movie.poster_path !== null);

    setMovies(validMovieResults);

    setIsLoading(false);
  };

  useEffect(() => {
    //@ts-ignore
    if (query.searchTerm) {
      //@ts-ignore
      setSearchTerm(query.searchTerm);
    } else {
      console.error("query is invalid");
    }
  }, [query]);

  useEffect(() => {
    if (searchTerm) {
      fetchMoviesBySearchTerm();
    }
  }, [searchTerm]);

  return (
    <>
      <LayoutNavbar />
      <div className="site-body min-h-[80vh] py-5">
        <div className="px-4 font-['Graphik'] md:mx-auto md:my-0 md:flex md:w-[950px] md:flex-col">
          {isLoading && <p className="text-base text-sh-grey">Loading..</p>}

          {movies && <FilterResults movies={movies} />}
        </div>

        <Footer />
      </div>
    </>
  );
}
