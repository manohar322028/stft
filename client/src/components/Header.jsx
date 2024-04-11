import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Header() {
  const location = useLocation();

  return (
    <nav
      className={`bg-ivory flex justify-between items-center px-4 py-2 border border-gray-200 shadow-md rounded-md`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <img src="logo.png" alt="Logo" className="w-12 h-12 mr-4" />
        <Link to="/" className="text-black font-bold text-xl">
          NNTA Bagmati
        </Link>
      </div>

      {/* Navigation links */}
      <ul className="hidden md:flex space-x-4">
        <li
          className={`px-2 py-1 text-black hover:text-blue-600 ${
            location.pathname === "/" ? "font-bold text-red-600" : ""
          }`}
        >
          <Link to="/">Home</Link>
        </li>
        <li
          className={`px-2 py-1 text-black hover:text-blue-600 ${
            location.pathname === "/news" ? "font-bold text-red-600" : ""
          }`}
        >
          <Link to="/news">News</Link>
        </li>
        <li
          className={`px-2 py-1 text-black hover:text-blue-600 ${
            location.pathname === "/notices" ? "font-bold text-red-600" : ""
          }`}
        >
          <Link to="/notices">Notices</Link>
        </li>
        <li
          className={`px-2 py-1 text-black hover:text-blue-600 ${
            location.pathname === "/about" ? "font-bold text-red-600" : ""
          }`}
        >
          <Link to="/about">About</Link>
        </li>
        <li
          className={`px-2 py-1 text-black hover:text-blue-600 ${
            location.pathname === "/downloads" ? "font-bold text-red-600" : ""
          }`}
        >
          <Link to="/downloads">Downloads</Link>
        </li>
      </ul>

      {/* Hamburger menu */}
      <div className="md:hidden text-black focus:outline-none">
        <RxHamburgerMenu />
      </div>
    </nav>
  );
}
