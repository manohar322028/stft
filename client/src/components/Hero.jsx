import React from "react";

export default function Hero() {
  return (
    <div className="relative" style={{ height: `calc(100vh - 4rem)` }}>
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlLHdhdGVyfHx8fHx8MTcxNDExMjQ5Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative flex flex-col justify-end h-full text-white pl-12 pb-12">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold">
            Nepal National Teachers Association
          </h1>
          <h2 className="text-2xl font-bold">Bagmati Pradesh</h2>
          <p className="mt-4 text-lg">Slogan Slogan Slogan Slogan</p>
        </div>
        <div className="text-left mt-4">
          <button className="px-8 py-2 text-white bg-themeBlue rounded hover:bg-blue-700">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
