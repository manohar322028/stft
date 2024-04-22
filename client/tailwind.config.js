const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        themeRed: "rgb(200 30 30)",
        themeBlue: "rgb(30 64 175)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
