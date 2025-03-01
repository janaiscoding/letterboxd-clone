"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { User, UserFavourite, UserWatched } from "../User";
import { ProfileBio } from "app/components/Profile/ProfileBio";
import { LayoutNavbar } from "app/components/Navigation/LayoutNavbar";
import { ProfileMoviesHighlight } from "app/components/Profile/ProfileMoviesHighlight";
import { ProfileReviews } from "app/components/Profile/ProfileReviews";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const [favourites, setFavourites] = useState<UserFavourite[]>([]);
  const [watched, setWatched] = useState<UserWatched[]>([]);

  const router = useRouter();

  const initProfilePage = async () => {
    setLoading(true);

    const userSnap = await getDoc(doc(db, "users", id));
    if (userSnap.exists()) {
      const user = userSnap.data() as User;
      setUser(user);

      setWatched(user.watched);
      setFavourites(user.favourites);
    }

    setLoading(false);
  };

  const setMovies = async () => {
    const userSnap = await getDoc(doc(db, "users", id));
    if (userSnap.exists()) {
      const user = userSnap.data() as User;

      setWatched(user.watched);
      setFavourites(user.favourites);
    }
  };

  const onEvent = () => {
    setMovies();
  };

  useEffect(() => {
    initProfilePage();
  }, [id, router]);

  if (loading) return <p>Loading...</p>;
  if (!loading && !user) return <p>Error loading user.</p>;

  return (
    <>
      <LayoutNavbar />
      <div className="site-body min-h-[78vh] py-5">
        <div className="flex flex-col px-4 font-['Graphik'] md:mx-auto md:my-0 md:w-[950px] md:py-8">
          <ProfileBio user={user} />
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <ProfileMoviesHighlight
                user={user}
                movies={favourites?.reverse()}
                watched={watched}
                favourites={favourites}
                type="favourites"
                onEvent={onEvent}
              />

              <ProfileMoviesHighlight
                user={user}
                movies={watched?.reverse()}
                watched={watched}
                favourites={favourites}
                type="watched"
                onEvent={onEvent}
              />
            </div>

            {user.reviews && <ProfileReviews reviews={user.reviews} />}
          </div>
        </div>
      </div>
    </>
  );
}
