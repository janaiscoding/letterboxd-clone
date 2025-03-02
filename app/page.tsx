"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { Home } from "./components/Home/Home";
import { HomeSignedOut } from "./components/Home/HomeSignedOut";
import { LayoutNavbar } from "./components/Navigation/LayoutNavbar";
import { Footer } from "./components/Navigation/Footer";

export default function Page() {
  const [user, setUser] = useState<any>();
  const [movies, setMovies] = useState<any>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    if (!res.ok) {
      console.error("error fetching popular movies");
      return;
    }

    const data = await res.json();

    setMovies(data.results);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    fetchPopularMovies();
  }, []);
  return (
    <>
      <LayoutNavbar />
      {isLoggedIn && <Home movies={movies} user={user} />}

      {!isLoggedIn && <HomeSignedOut movies={movies} />}

      <Footer />
    </>
  );
}
