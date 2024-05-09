import React from "react";

export default function Hero() {
  return (
    <div className="relative h-[27rem] sm:h-[32rem] flex flex-col justify-end items-center">
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlLHdhdGVyfHx8fHx8MTcxNDExMjQ5Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative text-white pl-4 sm:pl-8 pb-4 sm:pb-8 max-w-lg">
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
          <button className="px-6 py-2 text-white bg-themeBlue rounded hover:bg-blue-700 mb-4">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
