/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      "h-blue": "#14181C",
      "b-blue": "#1E252C",
      "l-white": "#99AABB",
      "p-white": "#def",

      "h-grey": "#91A0AF",
      // bg dropdown menu
      "drop-grey": "#89a",
      //text dropdown menu
      "drop-black": "#2c3440",
      //dropdown hover color
      "dd-blue": "#667788",
      //used on hover links on homepage
      "hov-blue": "#40bcf4",
      //used on borders on homepage
      "b-grey": "#456",
      //subheadings in home
      "sh-grey": "#9ab",
      // poster border color
      "pb-grey": "#def",
      "si-black": "#14181c",
      //input field
      "if-blue": "#2c3440",
      //card blue
      "c-blue": "#202830",
      //signout poster hover,
      "p-green": "#00e054",
      "b-green": "#00c030",
      "b-h-green": "#00B020",
      //home hover carts
      "h-hov-green": "#00C030",
      "h-hov-orange": "#EE7000",
      "h-hov-blue": "#209CE4",
    },
    // extend: {},
  },
  plugins: [],
};
