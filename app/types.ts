export interface UserReview {
  review: string;
  movieID: string;
  timestamp?: string;
}

export interface UserFavourite {
  movieID: string;
}

export interface UserWatched {
  movieID: string;
}

export interface User {
  uid: string;
  name: string;
  bio: string;
  photoUrl: string;
  favourites: UserFavourite[];
  watched: UserWatched[];
  reviews: UserReview[];
}

export interface Review {
  movieID: number;
  userName: string;
  uid: string;
  userURL: string;
  review: string;
  timestamp?: string;
}

export interface Movie {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
}
