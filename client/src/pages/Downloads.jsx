import React from "react";
import Downloads from "../components/Downloads";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import AOS from "aos";
import "aos/dist/aos.css";
import { useParams } from "react-router-dom";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { subject } = useParams();

  useEffect(() => {
    const fetchNotices = async () => {
      await fetch(server_url + `/api/downloads/${subject}`)
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setNotices(data);
        });
    };
    fetchNotices();
  }, [subject]);

  // Get current news items
  const indexOfLastNotice = currentPage * itemsPerPage;
  const indexOfFirstNotice = indexOfLastNotice - itemsPerPage;
  const currentNotice = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div
        className="container mx-auto px-4 pb-4 mt-10"
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <h2 className="text-3xl font-bold mb-6 ml-4">
          Resources | Subject: {subject}
        </h2>
        <Downloads notices={currentNotice} />
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={notices.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      <div className="mb-10"></div> {/* Spacer */}
    </>
  );
}
