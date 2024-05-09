import React from "react";

export default function Hero() {
  return (
    <div className="relative h-[27rem] sm:h-[32rem] flex flex-col justify-end items-center shadow-lg shadow-gray-500 ">
      {/* Background Image */}
      <img
        src="hero-bg.png"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full opacity-95"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative text-gray-100 pl-4 sm:pl-8 pb-4 sm:pb-8 max-w-lg">
        <div className="text-center">
          <h1 className="text-3xl merriweather-black">
            Society of Technology Friendly Teachers Nepal
          </h1>
          <h2 className="text-xl font-bold p-2 merriweather-regular">
            (STFT Nepal)
          </h2>
          <p className="mt-2  text-base  merriweather-light-italic">
            Slogan Slogan Slogan Slogan
          </p>
        </div>
        <div className="text-center mt-2 sm:mt-4">
          <button className="px-6 py-2 text-gray-100 bg-themeBlue rounded hover:bg-blue-700 mb-10">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
