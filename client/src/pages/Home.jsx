import React from "react";
import Hero from "../components/Hero";
import NewsCard from "../components/NewsCard";
import Slider from "react-slick";
import NoticeHome from "../components/NoticeHome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaCircle } from "react-icons/fa";

export default function Home() {
  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  let sliderRef = useRef(null);
  const nextSlide = () => {
    sliderRef.slickNext();
  };
  const previousSlide = () => {
    sliderRef.slickPrev();
  };
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

  useEffect(() => {
    const fetchNotices = async () => {
      await fetch("/api/notices")
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
        <h2 className="text-3xl font-bold mb-8 ml-4">Latest News</h2>
        <Slider
          ref={(slider) => {
            sliderRef = slider;
          }}
          {...sliderSettings}
        >
          {news.map((newsItem) => (
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
        <p className="text-right mr-4 text-lg mt-10 underline">
          Click Here for More News
        </p>
      </div>

      {/* notices */}
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4">Latest Notices</h2>
        <NoticeHome notices={notices.slice(0, 10)} />
        <p className="text-right mr-4 text-lg mt-10 underline">
          Click Here for More Notices
        </p>
      </div>
    </div>
  );
}
