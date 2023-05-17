import Watch from "./home-watch.png";
import Love from "./home-love.png";
import Reviews from "./home-reviews.png";
import Star from "./home-rate.png";
import Diary from "./home-diary.png";
import Lists from "./home-lists.png";
import uniqid from 'uniqid'

const letsYouData = [
  { 
    id: uniqid(),
    icon: Watch,
    text: "Keep track of every film you’ve ever watched (or just start from the day you join)",
    bgColor: "h-hov-green",
  },
  {
    id: uniqid(),
    icon: Love,
    text: "Show some love for your favorite films, lists and reviews with a “like”",
    bgColor: "h-hov-orange",
  },

  {
    id: uniqid(),
    icon: Reviews,
    text: "Write and share reviews, and follow friends and other members to read theirs",
    bgColor: "h-hov-blue",
  },

  {
    id: uniqid(),
    icon: Star,
    text: "Rate each film on a five-star scale (with halves) to record and share your reaction",
    bgColor: "h-hov-green",
  },
  {
    id: uniqid(),
    icon: Diary,
    text: "Keep a diary of your film watching (and upgrade to PRO for comprehensive stats)",
    bgColor: "h-hov-orange",
  },
  {
    id: uniqid(),
    icon: Lists,
    text: "Compile and share lists of films on any topic and keep a watchlist of films to see",
    bgColor: "h-hov-blue",
  },
];
export default letsYouData;
