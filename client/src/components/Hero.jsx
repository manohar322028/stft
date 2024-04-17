import React from "react";

export default function Hero() {
  return (
    <div className="relative" style={{ height: `calc(100vh - 4rem)` }}>
      {/* Background Image */}
      <img
        src="https://source.unsplash.com/1600x900/?nature,water"
        alt="Hero Background"
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-end h-full text-white pl-12 pb-12">
        <div className="text-left">
          <h1 className="text-4xl font-extrabold">
            Nepal National Teachers Association
          </h1>
          <h2 className="text-2xl font-bold">Bagmati Pradesh</h2>
          <p className="mt-4 text-lg">Slogan Slogan Slogan Slogan</p>
        </div>
        <div className="text-left mt-4">
          <button className="px-8 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
