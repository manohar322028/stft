import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdArrowDropDown } from "react-icons/md";
import { IconContext } from "react-icons";
import { MdEmail } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { BsFacebook, BsInstagram, BsTwitterX } from "react-icons/bs";

export default function Header() {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const [isClickedDistrict, setIsClickedDistrict] = useState(false);
  const [isClickedDistrictMobile, setIsClickedDistrictMobile] = useState(false);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      await fetch("/api/abouts/names")
        .then((res) => res.json())
        .then((data) => {
          setProvinces(data);
        });
    };
    fetchProvinces();
  }, []);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  const toggleDistrict = () => {
    setIsClickedDistrict(!isClickedDistrict);
  };

  const toggleDistrictMobile = () => {
    setIsClickedDistrictMobile(!isClickedDistrictMobile);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Add event listener to close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClickedDistrict(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const mobileDropdownRef = useRef(null);

  useEffect(() => {
    if (isClickedDistrictMobile && mobileDropdownRef.current) {
      // Scroll to the mobile dropdown when it's clicked
      mobileDropdownRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [isClickedDistrictMobile]);

  return (
    <>
      <header className=" w-full z-10 bg-themeSkin border-b-2 border-themeBlue bg-opacity-80">
        <div className="xl:container mx-auto md:max-lg:mx-0 flex flex-col md:flex-row items-center justify-between gap-2 py-4 px-6">
          <IconContext.Provider value={{ color: "#1F2421", size: "2em" }}>
            <div className="logo-section flex items-center mb-2 md:mb-0">
              <Link to="/" className="flex flex-col md:flex-row items-center">
                <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-2" />
                <span className="text-lg md:text-xl font-bold text-center merriweather-black text-themeBrown">
                  Society of Technology Friendly Teachers Nepal
                </span>
              </Link>
            </div>
            <div className="contact-section flex flex-col md:flex-row items-center md:ml-4 merriweather-light text-themeBlack">
              <div className="flex items-center mb-2 md:mb-0 mr-4 md:mr-6">
                <MdEmail className="w-5 h-5 mr-1 md:mr-2 text-gray-500" />
                <span className="text-xs md:text-sm text-gray-800">
                  email@email.com
                </span>
              </div>
              <div className="flex items-center">
                <MdPhone className="w-5 h-5 mr-1 md:mr-2 text-gray-500" />
                <span className="text-xs md:text-sm text-gray-800">
                  +977-1234567890
                </span>
              </div>
            </div>
            <div className="social-media-section flex items-center mt-2 md:mt-0">
              <BsFacebook className="w-6 h-6 mr-2 text-gray-500 hover:scale-125 cursor-pointer" />
              <BsInstagram className="w-6 h-6 mr-2 text-gray-500 hover:scale-125 cursor-pointer" />
              <BsTwitterX className="w-6 h-6 mr-2 text-gray-500 hover:scale-125 cursor-pointer" />
            </div>
          </IconContext.Provider>
        </div>
      </header>

      <nav className="bg-themeGray text-gray-900 merriweather-regular text-md px-4 shadow-sm shadow-gray-400 h-16 z-10">
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
            <NavLink
              to="/downloads"
              active={location.pathname === "/downloads"}
            >
              Downloads
            </NavLink>
            <NavLink
              to="/membership"
              active={location.pathname === "/membership"}
            >
              Membership
            </NavLink>

            <div
              onClick={toggleDistrict}
              className={`relative px-6 h-full flex items-center justify-center hover:bg-themeBlue hover:text-gray-200 hover:border-x-[0.5px] hover:border-white transition-colors duration-200 cursor-pointer ${
                isClickedDistrict ? "bg-themeBlue text-gray-200" : ""
              }`}
            >
              Provinces <MdArrowDropDown />
              {/* provinces dropdown */}
              <div
                ref={dropdownRef}
                className={`${
                  isClickedDistrict ? "inline-block" : "hidden"
                } absolute top-full left-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden z-30 w-48`}
              >
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
          </div>

          {/* for mobile */}

          <div
            className="flex md:hidden items-center justify-around mx-0 w-full h-full cursor-pointer"
            onClick={toggleMenu}
          >
            <span className="text-themeBrown merriweather-regular ">Menu</span>
            <IconContext.Provider value={{ color: "#100B00ea", size: "2em" }}>
              <button className=" focus:outline-none z-50">
                <RxHamburgerMenu />
              </button>
            </IconContext.Provider>
          </div>
          <div
            className={`md:hidden ${
              isClicked ? "block" : "hidden"
            } fixed inset-0 overflow-y-auto scrollbar scrollbar-w-2 scrollbar-thumb-gray-100 scrollbar-track-transparent scrollbar-thumb-rounded-full  bg-themeBlack text-white z-50 bg-opacity-95 transition-opacity duration-300`}
          >
            <div className="flex flex-col items-center justify-center h-screen text-white">
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
              <MNavLink
                to="/downloads"
                active={location.pathname === "/downloads"}
                onClick={toggleMenu}
              >
                Downloads
              </MNavLink>
              <MNavLink
                to="/membership"
                active={location.pathname === "/membership"}
                onClick={toggleMenu}
              >
                Membership
              </MNavLink>
              <div
                className={`relative px-6 py-4 h-full w-full flex items-center justify-start text-xl hover:bg-themeGray hover:text-themeBrown hover:bg-opacity-40 transition-colors duration-200 cursor-pointer ${
                  isClickedDistrict
                    ? "bg-gray-100 bg-opacity-40 text-themeBlue"
                    : ""
                }`}
                onClick={toggleDistrictMobile}
              >
                Provinces <MdArrowDropDown />
                {/* provinces dropdown */}
                <div
                  ref={mobileDropdownRef}
                  className={`${
                    isClickedDistrictMobile ? "inline-block" : "hidden"
                  } absolute top-full left-0 mr-2 bg-transparent overflow-hidden w-full`}
                >
                  {provinces.map((province) => (
                    <Link
                      key={province.province_number}
                      to={`/provinces/${province.province_number}`}
                      onClick={() => {
                        toggleMenu();
                      }}
                      className="block w-full px-12 py-2 cursor-pointer text-lg text-white hover:bg-themeGray hover:text-themeBrown hover:bg-opacity-40 transition-colors duration-200"
                    >
                      {province.province_name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, active, children, onClick }) {
  const baseClasses = "px-6 h-full flex items-center justify-center ";
  const hoverClasses =
    "hover:bg-themeBlue hover:text-gray-200 hover:border-x-[0.5px] hover:border-white transition-colors duration-200 ";
  const activeClasses = "bg-themeBlue text-gray-200";

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
  const hoverClasses =
    "hover:bg-themeGray hover:text-themeBrown hover:bg-opacity-40 transition-colors duration-200 ";
  const activeClasses = "bg-gray-100 bg-opacity-40 text-themeBlue";

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
