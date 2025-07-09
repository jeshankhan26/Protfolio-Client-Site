import React, { useState } from 'react';
import Links from './Link'; // make sure this returns <li> items
import { FaArrowCircleRight } from "react-icons/fa";
import { MdDeveloperMode } from "react-icons/md";
import { NavLink } from 'react-router'; // ✅ Fixed import
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="navbar lg:px-80 shadow-xl bg-white sticky top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 10 }}
    >
      {/* Navbar Start (Mobile + Logo) */}
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <button
          onClick={toggleDropdown}
          aria-label="Toggle menu"
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>

        {/* Dropdown Menu (Mobile Only) */}
        {isOpen && (
          <ul className="menu menu-sm rounded-box mt-3 w-52 p-2 shadow bg-white absolute top-14 left-2 z-50">
            <Links />
          </ul>
        )}

        {/* Logo */}
        <NavLink
          to="/"
          className="btn bg-white border-none shadow-none text-black lg:text-2xl flex items-center gap-2"
        >
          <MdDeveloperMode size={28} /> Jeshan Khan
        </NavLink>
      </div>

      {/* Navbar Center (Desktop Menu) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <Links />
        </ul>
      </div>

      {/* Navbar End (Hire Me Button) */}
      <div className="navbar-end">
        <motion.a
          whileHover={{ scale: 1.1, backgroundColor: "#f0f0f0" }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-white border-gray-300 text-black rounded-3xl text-lg py-3 px-5 flex items-center gap-2"
          href="https://www.linkedin.com/in/jeshankhan26/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hire Me <FaArrowCircleRight className="heartbeat text-gray-600" size={20} />
        </motion.a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
