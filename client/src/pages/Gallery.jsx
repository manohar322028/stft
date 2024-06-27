import React, { useState, useEffect } from "react";
import PhotoCard from "../components/PhotoCard";
import Pagination from "../components/Pagination";

const Gallery = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchNews = async () => {
      await fetch("/api/news")
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setNews(data);
        });
    };
    fetchNews();
  }, []);

  // Get current news items
  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 ml-4">All News</h2>

      <div className="flex gap-4">
        {currentNews.map((newsItem) => (
          <PhotoCard key={newsItem._id} {...newsItem} />
        ))}
      </div>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={news.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Gallery;
