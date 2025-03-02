import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "h-blue": "#14181C",
      "b-blue": "#1E252C",
      "l-white": "#99AABB",
      "p-white": "#def",

      // new theme
      "navigation-bg": "#1e1f21",

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
      "input-bg": "#2c3440",
      //card blue
      "c-blue": "#202830",
      //signout poster hover,
      "p-green": "#00e054",
      "b-green": "#00c030",
      "b-h-green": "#00B020",
      // cast bg color
      "c-grey": "#283038",

      "review-bg": "#0b1014",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
