const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        themeRed: "#FF0000",
        themeSkin: "#DDCA7D",
        themeBlue: "#03045E",
        themeGray: "#d3d2d4",
        themeBrown: "#100B00ea",
        themeBlack: "#1F2421",
      },
    },
  },
  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};
