import React from "react";

export default function NewsCard({ image, title, content }) {
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
        <button className="px-4 py-2 bg-themeBlue text-white rounded hover:bg-blue-600">
          Read More
        </button>
      </div>
    </div>
  );
}
