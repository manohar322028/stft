import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { BsFacebook } from "react-icons/bs";

import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const server_url = import.meta.env.VITE_SERVER_URL;

const resources = [
  "Nepali",
  "English",
  "Mathematics",
  "Science",
  "Social",
  "HPE",
  "Optional Subject I",
  "Optional Subject II",
  "Others",
];

export default function Header() {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedProvince, setIsClickedProvince] = useState(false);
  const [isClickedResource, setIsClickedResource] = useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      await fetch(server_url + "/api/abouts/names")
        .then((res) => res.json())
        .then((data) => {
          data.sort((a, b) => a.province_number - b.province_number);
          setProvinces(data);
        });
    };
    fetchProvinces();
  }, []);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  const toggleProvince = () => {
    setIsClickedProvince(!isClickedProvince);
  };

  const toggleResource = () => {
    setIsClickedResource(!isClickedResource);
  };

  const dropdownRef = useRef(null);
  const resourceDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClickedProvince(false);
      }
      if (
        resourceDropdownRef.current &&
        !resourceDropdownRef.current.contains(event.target)
      ) {
        setIsClickedResource(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isClickedResource && resourceDropdownRef.current) {
      resourceDropdownRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isClickedResource]);

  return (
    <>
      <header className="w-full z-10 bg-white border-b-2 border-gray-200">
        <div className="xl:container mx-auto md:max-lg:mx-0 flex flex-col md:flex-row items-center justify-between gap-2 py-4 px-6">
          <IconContext.Provider value={{ color: "#03045E", size: "2em" }}>
            <div className="logo-section flex items-center mb-2 md:mb-0">
              <Link to="/" className="flex flex-col md:flex-row items-center">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold text-left merriweather-black text-themeBlue">
                    प्रविधिमैत्री शिक्षक समाज, नेपाल
                  </span>
                  <span className="text-sm md:text-base font-bold text-left merriweather-black text-themeBlue">
                    Society of Technology Friendly Teachers Nepal
                  </span>
                </div>
              </Link>
            </div>
            <div className="contact-section flex flex-col md:flex-row items-center md:ml-4 merriweather-light text-gray-700">
              <div className="flex items-center mb-2 md:mb-0 mr-4 md:mr-6">
                <MdEmail className="w-5 h-5 mr-1 md:mr-2 text-themeBlue" />
                <span className="text-xs md:text-sm">
                  stftnepal19@gmail.com
                </span>
              </div>
              <div className="flex items-center">
                <MdPhone className="w-5 h-5 mr-1 md:mr-2 text-themeBlue" />
                <span className="text-xs md:text-sm">
                  9847020826 / 9847651200
                </span>
              </div>
            </div>
            <div className="social-media-section flex items-center mt-2 md:mt-0">
              <a
                href="https://www.facebook.com/groups/468915873599970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-1 border border-themeBlue rounded-full text-themeBlue hover:bg-themeBlue hover:text-white transition-colors duration-200"
              >
                <BsFacebook className="w-5 h-5 mr-2" />
                <span className="text-sm">Join our Facebook group</span>
              </a>
            </div>
          </IconContext.Provider>
        </div>
      </header>

      <nav className="bg-themeBlue text-white merriweather-regular text-md px-4 shadow-sm shadow-gray-400 h-16 z-10">
        <div className="xl:container mx-auto flex justify-between items-center h-full w-full max-w-7xl">
          <div className="hidden md:flex md:items-center md:justify-end h-full">
            <NavLink to="/" active={location.pathname === "/"}>
              Home
            </NavLink>
            <NavLink to="/news" active={location.pathname === "/news"}>
              News
            </NavLink>
            <NavLink to="/notices" active={location.pathname === "/notices"}>
              Notices
            </NavLink>
            <NavLink to="/about" active={location.pathname === "/about"}>
              About
            </NavLink>

            <div className="relative group h-full">
              <div className="px-6 h-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
                Resources <MdArrowDropDown />
              </div>
              <div className="absolute left-0 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-30 w-48 hidden group-hover:block">
                {resources.map((resource, index) => (
                  <Link
                    key={index}
                    to={`/resources/${resource}`}
                    className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200 hover:text-gray-900"
                  >
                    {resource}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink
              to="/membership"
              active={location.pathname === "/membership"}
            >
              Membership
            </NavLink>

            <div className="relative group h-full">
              <div className="px-6 h-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
                Provinces <MdArrowDropDown />
              </div>
              <div className="absolute left-0 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-30 w-48 hidden group-hover:block">
                {provinces.map((province) => (
                  <Link
                    key={province.province_number}
                    to={`/provinces/${province.province_number}`}
                    className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200 hover:text-gray-900"
                  >
                    {province.province_name}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/gallery" active={location.pathname === "/gallery"}>
              Gallery
            </NavLink>
          </div>

          {/* Mobile menu */}
          <div
            className="flex md:hidden items-center justify-around mx-0 w-full h-full cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="text-white merriweather-regular">Menu</span>
            <IconContext.Provider value={{ color: "#ffffff", size: "2em" }}>
              <button className="focus:outline-none z-50">
                <RxHamburgerMenu />
              </button>
            </IconContext.Provider>
          </div>
          <div
            className={`md:hidden ${
              isClicked ? "block" : "hidden"
            } fixed inset-0 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thumb-rounded-full bg-themeBlue text-white z-50 bg-opacity-95 transition-opacity duration-300`}
          >
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
              <button
                className="absolute top-4 right-4 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg
                  className="h-6 w-6 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <MNavLink
                to="/"
                active={location.pathname === "/"}
                onClick={toggleMenu}
              >
                Home
              </MNavLink>
              <MNavLink
                to="/news"
                active={location.pathname === "/news"}
                onClick={toggleMenu}
              >
                News
              </MNavLink>
              <MNavLink
                to="/notices"
                active={location.pathname === "/notices"}
                onClick={toggleMenu}
              >
                Notices
              </MNavLink>
              <MNavLink
                to="/about"
                active={location.pathname === "/about"}
                onClick={toggleMenu}
              >
                About
              </MNavLink>
              <div
                className={`relative px-6 py-4 h-full w-full flex items-center justify-start text-xl hover:bg-blue-800 transition-colors duration-200 cursor-pointer ${
                  isClickedResource ? "bg-blue-800" : ""
                }`}
                onClick={toggleResource}
              >
                Resources <MdArrowDropDown />
              </div>
              {isClickedResource && (
                <div
                  ref={resourceDropdownRef}
                  className="w-full bg-blue-900 overflow-hidden"
                >
                  {resources.map((resource, index) => (
                    <Link
                      key={index}
                      to={`/resources/${resource
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      onClick={toggleMenu}
                      className="block w-full px-12 py-2 cursor-pointer text-lg text-white hover:bg-blue-700 transition-colors duration-200"
                    >
                      {resource}
                    </Link>
                  ))}
                </div>
              )}
              <MNavLink
                to="/membership"
                active={location.pathname === "/membership"}
                onClick={toggleMenu}
              >
                Membership
              </MNavLink>
              <div
                className={`relative px-6 py-4 h-full w-full flex items-center justify-start text-xl hover:bg-blue-800 transition-colors duration-200 cursor-pointer ${
                  isClickedProvince ? "bg-blue-800" : ""
                }`}
                onClick={toggleProvince}
              >
                Provinces <MdArrowDropDown />
              </div>
              {isClickedProvince && (
                <div
                  ref={dropdownRef}
                  className="w-full bg-blue-900 overflow-hidden"
                >
                  {provinces.map((province) => (
                    <Link
                      key={province.province_number}
                      to={`/provinces/${province.province_number}`}
                      onClick={toggleMenu}
                      className="block w-full px-12 py-2 cursor-pointer text-lg text-white hover:bg-blue-700 transition-colors duration-200"
                    >
                      {province.province_name}
                    </Link>
                  ))}
                </div>
              )}
              <MNavLink
                to="/gallery"
                active={location.pathname === "/gallery"}
                onClick={toggleMenu}
              >
                Gallery
              </MNavLink>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, active, children, onClick }) {
  const baseClasses = "px-6 h-full flex items-center justify-center ";
  const hoverClasses = "hover:bg-blue-800 transition-colors duration-200 ";
  const activeClasses = "bg-blue-800";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${
        active ? activeClasses : ""
      }`}
    >
      {children}
    </Link>
  );
}

function MNavLink({ to, active, children, onClick }) {
  const baseClasses =
    "px-6 py-4 h-full w-full flex items-center justify-start text-xl";
  const hoverClasses = "hover:bg-blue-800 transition-colors duration-200 ";
  const activeClasses = "bg-blue-800";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${
        active ? activeClasses : ""
      }`}
    >
      {children}
    </Link>
  );
}
