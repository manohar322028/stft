import React from "react";
import { Link } from "react-router-dom";

export default function NewsCard({ image, title, content, slug }) {
  // Function to safely truncate HTML content
  const truncateHTML = (html, maxLength) => {
    const truncatedText = document.createElement("div");
    truncatedText.innerHTML = html;
    let text = truncatedText.textContent || truncatedText.innerText || "";
    if (text.length > maxLength) {
      text = text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const truncatedContent = truncateHTML(content, 100);

  const imgUrl = image ? "/files/" + image : "newsdefault.png";
  return (
    <div className="bg-white shadow-md shadow-gray-400 rounded-lg overflow-hidden mx-4 mt-2 mb-8 transition duration-300 transform hover:scale-105 cursor-pointer">
      {/* Thumbnail */}
      <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      {/* Content */}
      <div className="p-4 lg:h-48 h-52 mb-2 relative">
        {/* News Title */}
        <h2 className="text-xl font-bold mb-2 mukta-bold">{title}</h2>

        {/* Truncated News Content */}
        <p className="text-gray-600 text-base mb-4 mukta-regular">
          {truncatedContent}
        </p>

        {/* Read More Button */}
        <Link to={`/news/${slug}`}>
          <button className="px-4 py-2 bg-themeBlue text-gray-200 text-base rounded hover:bg-blue-800 absolute bottom-2 mukta-light">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}
