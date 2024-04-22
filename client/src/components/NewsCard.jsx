import React from "react";

export default function NewsCard({ image, title, content }) {
  const truncatedContent = content.slice(0, 100) + "...";

  const imgUrl = image ? "/files/" + image : "newsdefault.png";
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden mx-4">
      {/* Thumbnail */}
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      {/* Content */}
      <div className="p-4">
        {/* News Title */}
        <h2 className="text-xl font-bold mb-2">{title}</h2>

        {/* Truncated News Content */}
        <p className="text-gray-600 text-sm mb-4">{truncatedContent}</p>

        {/* Read More Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Read More
        </button>
      </div>
    </div>
  );
}
