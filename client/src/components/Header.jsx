import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons";

export default function Header() {
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);

  const toggleMenu = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <nav className="bg-red-700 text-white px-4 border-b border-gray-300 shadow-md h-16">
        <div className="container mx-auto flex justify-between items-center h-full w-full max-w-7xl">
          <Link to="/" className="flex items-center justify-start h-full">
            <img src="logo.png" alt="Logo" className="w-12 h-12" />
            <span className="mx-2 text-2xl font-bold">NNTA Bagmati</span>
          </Link>

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
          </div>

          {/* for mobile */}

          <IconContext.Provider value={{ color: "white", size: "2em" }}>
            <button
              className="md:hidden focus:outline-none"
              onClick={toggleMenu}
            >
              <RxHamburgerMenu />
            </button>
          </IconContext.Provider>
          <div
            className={`md:hidden ${
              isClicked ? "block" : "hidden"
            } fixed inset-0 bg-red-700 text-white z-50 bg-opacity-95 transition-opacity duration-300`}
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
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, active, children, onClick }) {
  const baseClasses =
    "px-6 text-white h-full flex items-center justify-center ";
  const hoverClasses =
    "hover:bg-blue-900 hover:text-white hover:border-x-[0.5px] hover:border-white transition-colors duration-200 ";
  const activeClasses = "bg-blue-900 text-white";

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
    "px-6 py-4 h-full w-full flex items-center justify-center text-xl";
  const hoverClasses =
    "hover:bg-gray-100 hover:text-black hover:bg-opacity-40 transition-colors duration-200 ";
  const activeClasses = "bg-gray-100 bg-opacity-40 text-blue-900";

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
