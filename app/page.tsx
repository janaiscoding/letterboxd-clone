"use client";
import { useEffect, useState } from "react";
import App from "../src/App";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/firebase/firebase";
import Navbar from "./components/Navigation/Navbar";
import { Home } from "./components/Home/Home";
import { HomeSignedOut } from "./components/Home/HomeSignedOut";

export default function Page() {
  const [user, setUser] = useState<any>();
  const [popularMovies, setPopularMovies] = useState<any>();

  //this handles the login/logout styles and displays in the navbar
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTransparentNav, setIsTransparentNav] = useState(false);

  const fetchPopularMovies = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    if (!res.ok) {
      console.error("error fetching popular movies");
      return;
    }

    const data = await res.json();
    const popularMovies = data.results.slice(0, 6);

    setPopularMovies(popularMovies);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setIsTransparentNav(true);
      }
    });

    fetchPopularMovies();
  }, []);
  return (
    <>
      <Navbar
        userName={user?.displayName}
        profilePic={user?.photoURL}
        isLoggedIn={isLoggedIn}
        isTransparentNav={isTransparentNav}
      />
      {isLoggedIn && <Home popular={popularMovies} user={user} />}

      {!isLoggedIn && <HomeSignedOut movies={popularMovies} />}
    </>
  );
}
