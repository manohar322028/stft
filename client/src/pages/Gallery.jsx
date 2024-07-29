import React, { useState, useEffect } from "react";
import PhotoCard from "../components/PhotoCard";
import Pagination from "../components/Pagination";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

const Gallery = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;

  useEffect(() => {
    const fetchNews = async () => {
      await fetch(server_url + "/api/gallery")
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

  const indexOfLastNews = currentPage * itemsPerPage;
  const indexOfFirstNews = indexOfLastNews - itemsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
      className="container mx-auto py-12 px-4"
      data-aos="fade-up"
      data-aos-delay="50"
      data-aos-duration="1000"
      data-aos-easing="ease-in-out"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <h2 className="text-3xl font-bold mb-8 ml-4">Gallery</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
