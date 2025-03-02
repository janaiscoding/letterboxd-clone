# ClonnerboxD - Letterboxd Clone

## Project's Scope

- Fully responsive clone of a popular social movie tracking and reviewing platform.
- Search, save and review your favourite movies, fetched from The Movie Database ’s API.
- Implemented Google Authentication using the BaaS Firebase Auth and storing all users' information in Firestore DB.
- Live preview on [Firebase's Hosting](https://clonnerboxd.web.app/).

## Live Demo

### On Browser

![Gif preview of the Clonnerboxd](./src/assets/clonnerboxd-preview-desktop.gif)

### On Mobile

![Gif preview of the Clonnerboxd on mobile](/src/assets/clonnerboxd-mobile-preview.gif)

## Getting Started

### Installing and running

```
git clone https://github.com/janaiscoding/letterboxd-clone.git
cd letterboxd-clone
npm install
```

Create a `.env` file at the root of the repository with the following values:

https://firebase.google.com/docs/web/learn-more#config-object

```
NEXT_PUBLIC_API_KEY = "your-firebase-api-key"
NEXT_PUBLIC_APP_ID = "your-firebase-app-id"
NEXT_PUBLIC_MESSAGING_ID = "your-firebase-messaging-id"
NEXT_PUBLIC_AUTH_DOMAIN = "your-firebase-auth-domain-id"
NEXT_PUBLIC_PROJECT_ID = "your-firebase-project-id"
NEXT_PUBLIC_STORAGE_BUCKET = "your-firebase-storage-bucket"
NEXT_PUBLIC_TMDB_API_KEY="your-TMDB-api-key"
```

```
npm run start
```

## Project Details & Description

- On **Homepage** you can see the current popular movies, fetched from [The Movie Database](https://www.themoviedb.org/).
- On **Profile** you can see what movies you liked and watched, as well as your most recent reviews.
- On **Films** page you can filter by different browsing categories: years, ratings, popularity, and genres!
- On **Members** you can see all the currently registered users and their info. You can see their profiles as well.
- On **Reviews** you can see all the reviews on the platform.
- On **Settings** you can edit your display name and your bio (which will update your profile).
- In the navbar you can **search** for any movie to add to your collection.

# Built with

## Technologies

- ReactJs, Javascript, TypeScript, Next.js
- CSS3, TailwindCSS
- HTML5

## Tools Used

- Visual Studio Code
- npm package manager
- Linux Terminal
- Git and Github

## Sources, Materials, Copyright

- This is a [Letterboxd](https://letterboxd.com/) website replica
- API used: [The Movie Database](https://www.themoviedb.org/)
