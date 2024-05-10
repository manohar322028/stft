import React from "react";

export default function TeamCard({ photo, name, position }) {
  return (
    <div className="flex items-center mb-4 p-4 border border-themeGray shadow-md shadow-gray-300 ">
      <div className="w-20 h-20 rounded-full overflow-hidden mr-4">
        <img
          src={photo}
          alt="Team member"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="merriweather-bold">{name}</div>
        <div className="merriweather-light">{position}</div>
      </div>
    </div>
  );
}
