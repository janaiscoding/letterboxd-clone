"use client";

import MovieBackdrop from "../../components/Movie/MovieBackdrop";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MovieSynopsis from "../../components/Movie/MovieSynopsis";
import MoviePoster from "../../components/Movie/MoviePoster";
import { MovieReviews } from "../../components/Movie/MovieReviews";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { Movie } from "app/types";
import { Footer } from "app/components/Navigation/Footer";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchMovie() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&append_to_response=credits`
        );

        if (!res.ok) throw new Error("Movie not found");

        const data: Movie = await res.json();
        setMovie(data);
      } catch (err) {
        setError(true);
        router.replace("/404"); // Redirect to not found page
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (error || !movie) return <p>Error loading movie.</p>;

  const backdrop = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const poster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  return (
    <>
      <LayoutNavbar />
      <div className="movie-body pb-5 md:mx-auto">
        <MovieBackdrop backdrop={backdrop} />
        <div className="flex flex-col px-4 md:mx-auto md:my-0 md:w-[950px]">
          <div className="mt-[-20%] flex flex-col gap-3 md:mt-[-10%] md:flex-row">
            <MoviePoster poster={poster} title={movie.title} id={movie.id} />
            <MovieSynopsis movie={movie} />
          </div>
          <div className="flex items-center justify-center">
            <MovieReviews movie={movie} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
