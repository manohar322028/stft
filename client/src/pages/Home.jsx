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
import { FaExternalLinkAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Home() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [notices, setNotices] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(0);
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
    if (news.length >= 3) {
      setSlidesToShow(3);
    } else {
      setSlidesToShow(news.length);
    }
  }, [news]);

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
    slidesToShow: slidesToShow,
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
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular text-indigo-700"
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
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular  text-indigo-700"
          onClick={changeRoute("/notices")}
        >
          Click Here for More Notices
        </p>
      </div>

      {/* downloads */}
      <div className="container mx-auto px-4 pb-4">
        <h2 className="text-3xl font-bold mb-6 ml-4 merriweather-bold">
          Latest Resources
        </h2>
        <Downloads notices={downloads.slice(0, 10)} />
        <p
          className="text-right mr-4 text-lg mt-10 underline cursor-pointer merriweather-regular  text-indigo-700"
          onClick={changeRoute("/resources/Others")}
        >
          Click Here for More Resources
        </p>
      </div>

      {/* Useful links for teachers */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 ml-4 merriweather-bold">
          Useful Links for Teachers
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "पाठ्यक्रम विकास केन्द्र", url: "https://moecdc.gov.np/" },
            {
              name: "शिक्षा तथा मानव स्रोत विकास केन्द्र",
              url: "https://cehrd.gov.np/",
            },
            { name: "शिक्षक सेवा आयोग", url: "https://tsc.gov.np/" },
            { name: "राष्ट्रिय परीक्षा बोर्ड", url: "https://www.neb.gov.np/" },
            { name: "शिक्षा मन्त्रालय", url: "https://moest.gov.np/" },
            { name: "ई-पुस्तकालय", url: "https://pustakalaya.org/ne/" },
            { name: "राष्ट्रिय किताबखाना (शिक्षक)", url: "#" },
            { name: "कर्मचारी सञ्चय कोष", url: "https://epf.org.np/" },
            { name: "नागरिक लगानी कोष", url: "https://www.nlk.org.np/home" },
            {
              name: "STFT Nepal Youtube Channel",
              url: "https://www.youtube.com/@ghanashyamadhikari",
            },
          ].map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              <span className="flex-grow merriweather-regular">
                {link.name}
              </span>
              <FaExternalLinkAlt className="text-indigo-600 ml-2" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
