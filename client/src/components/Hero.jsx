import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

export default function Hero() {
  const [hero, setHero] = useState([]);
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    centerMode: true,
    centerPadding: "0px",
  };

  const navigate = useNavigate();
  const changeRoute = (route) => () => {
    navigate(route);
  };

  useEffect(() => {
    const fetchHero = async () => {
      await fetch(server_url + "/api/gallery/featured")
        .then((res) => res.json())
        .then((data) => {
          data = data.sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          setHero(data);
        });
    };
    fetchHero();
  }, []);

  return (
    <div
      className="bg-cover bg-center py-8 shadow-md shadow-gray-700/20"
      style={{
        backgroundColor: "#61656925",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      data-aos="fade-in"
      data-aos-duration="1000"
      data-aos-delay="50"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
      data-aos-once="false"
      data-aos-anchor-placement="top-center"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Responsive layout for tablets and larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Slider Section */}
          <div className="w-full h-full overflow-hidden">
            <Slider {...settings}>
              {hero.map((image) => (
                <div
                  key={image._id}
                  className="flex justify-center items-center h-full"
                >
                  <img
                    src={`/files/${image.image}`}
                    alt={image.caption}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Text Content Section */}
          <div className="flex flex-col justify-center md:text-left text-center text-themeBlack merriweather-regular">
            <h1 className="text-xl md:text-2xl merriweather-black mb-4">
              Society of Technology Friendly Teachers Nepal
            </h1>
            <h2 className="text-lg sm:text-xl font-bold merriweather-regular mb-4">
              (STFT Nepal)
            </h2>
            <p className="text-base sm:text-lg merriweather-light-italic mb-4">
              A great platform for technology friendly teachers
            </p>
            <p className="text-base mb-8 merriweather-regular">
              <span className="merriweather-black">Join our platform</span> to
              collaborate with like-minded educators, access cutting-edge
              resources, and transform your teaching practice into a dynamic,
              future-ready experience. Together, we can shape the future of
              education through innovation and shared expertise.
            </p>
            {/* Buttons positioned at bottom center, stacked vertically */}
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row md:justify-end mt-8">
          <button
            className="px-6 py-2 text-gray-100 bg-themeBlue rounded hover:bg-blue-700 mt-2 md:w-1/5 "
            onClick={changeRoute("/contactus")}
          >
            Contact Us
          </button>
          <button
            className="px-6 py-2 text-gray-100 bg-themeBlue rounded hover:bg-blue-700 md:w-1/5 mt-2 md:ml-4"
            onClick={changeRoute("/membership")}
          >
            Join Community
          </button>
        </div>
      </div>
    </div>
  );
}
