/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      'h-blue': '#14181C',
      'b-blue': '#1E252C',
      'l-white':'#99AABB',
      'p-white': "#def",

      'h-grey': '#91A0AF',
      // bg dropdown menu
      'drop-grey': "#89a",
      //text dropdown menu
      'drop-black':"#2c3440",
      //used on hover links on homepage
      'hov-blue': "#40bcf4",
      //used on borders on homepage
      'b-grey':"#456"
    }
    // extend: {},
  },
  plugins: [],
};
