import React from "react";
import { Navbar, NavbarBrand } from "flowbite-react";

import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  return (
    <>
      <Navbar
        fluid
        rounded
        className="bg-gray-700 flex justify-center items-center"
      >
        <NavbarBrand as={Link} to="/" className="text-white pr-32">
          <img src="dummy-logo.png" alt="Logo" className="w-12 h-12" />
        </NavbarBrand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            active={location.pathname === "/"}
            className="text-white"
          >
            <Link to="/">Home</Link>
          </Navbar.Link>
          <Navbar.Link
            active={location.pathname === "/news"}
            className="text-white"
          >
            <Link to="/news">News</Link>
          </Navbar.Link>
          <Navbar.Link
            active={location.pathname === "/notices"}
            className="text-white"
          >
            <Link to="/notices">Notices</Link>
          </Navbar.Link>
          <Navbar.Link
            active={location.pathname === "/about"}
            className="text-white"
          >
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link
            active={location.pathname === "/downloads"}
            className="text-white"
          >
            <Link to="/downloads">Downloads</Link>
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
