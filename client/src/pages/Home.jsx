import React from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import Slider from "react-slick";
import NoticeHome from "../components/NoticeHome";
import Downloads from "../components/Downloads";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Home() {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.slickNext();
  };
  const previousSlide = () => {
    sliderRef.slickPrev();
  };

  const changeRoute = (route) => () => {
    navigate(route);
  };
  useEffect(() => {
    const fetchNews = async () => {
      await fetch(server_url + "/api/news")
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

  useEffect(() => {
    const fetchNotices = async () => {
      await fetch(server_url + "/api/notices")
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setNotices(data);
        });
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchDownloads = async () => {
      await fetch(server_url + "/api/downloads")
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setDownloads(data);
        });
    };
    fetchDownloads();
  }, []);

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "cubic-bezier(0.2, 0, 0, 1)",
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <div className="w-full">
      {/* hero */}
      <Hero />

      {/* news */}

      <div className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 ml-4 merriweather-bold">
          Latest News
        </h2>

        <div className="md:hidden grid gap-4 sm:grid-cols-2">
          {news.slice(0, 5).map((newsItem) => (
            <NewsCard key={newsItem._id} {...newsItem} />
          ))}
        </div>
        <div className="hidden md:block">
          <Slider
            ref={(slider) => {
              sliderRef = slider;
            }}
            {...sliderSettings}
          >
            {news.slice(0, 4).map((newsItem) => (
              <NewsCard key={newsItem._id} {...newsItem} />
            ))}
          </Slider>
          {/* dots and arrows */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <div className="flex items-center space-x-4">
              <FaChevronLeft
                className="text-themeRed text-sm cursor-pointer hover:text-themeBlue"
                onClick={previousSlide}
              />
              {[...Array(4)].map((_, index) => (
                <FaCircle
                  key={index}
                  className={`${
                    slideIndex === index
                      ? "text-themeBlue opacity-80"
                      : "text-gray-400"
                  } hover:text-themeBlue cursor-pointer text-sm`}
                  onClick={() => sliderRef.slickGoTo(index)}
                />
              ))}

              <FaChevronRight
                className="text-themeRed text-sm cursor-pointer hover:text-themeBlue"
                onClick={nextSlide}
              />
            </div>
          </div>
        </div>
        <p
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular"
          onClick={changeRoute("/news")}
        >
          Click Here for More News
        </p>
      </div>

      {/* notices */}
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4 merriweather-bold">
          Latest Notices
        </h2>
        <NoticeHome notices={notices.slice(0, 10)} />
        <p
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular"
          onClick={changeRoute("/notices")}
        >
          Click Here for More Notices
        </p>
      </div>

      {/* downloads */}
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4 merriweather-bold">
          Downloads
        </h2>
        <Downloads notices={downloads.slice(0, 10)} />
        <p
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular"
          onClick={changeRoute("/downloads")}
        >
          Click Here for More Downloads
        </p>
      </div>
    </div>
  );
}
