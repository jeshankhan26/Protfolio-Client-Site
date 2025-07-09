import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router"; // ✅ Correct import

const Links = () => {
  const [pagesOpen, setPagesOpen] = useState(false);
  const pagesRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (pagesRef.current && !pagesRef.current.contains(event.target)) {
        setPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <ul className="flex flex-col lg:flex-row lg:space-x-6 text-lg font-medium">
      {/* Home */}
      <li className="pt-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `relative px-2 py-1 rounded transition-colors duration-300 hover:text-blue-600 ${
              isActive ? "text-blue-600 font-semibold" : ""
            }`
          }
        >
          Home
        </NavLink>
      </li>

      {/* Pages Dropdown */}
      <li
        className="relative pt-1 group"
        ref={pagesRef}
        onMouseEnter={() => setPagesOpen(true)}
        onMouseLeave={() => setPagesOpen(false)}
      >
        <button
          type="button"
          onClick={() => setPagesOpen((prev) => !prev)}
          className="flex items-center px-2 py-1 rounded hover:text-blue-600 transition duration-300"
        >
          Pages
          <svg
            className={`ml-1 w-4 h-4 transition-transform duration-300 ${
              pagesOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <ul
          className={`absolute left-0 mt-2 w-48 bg-white rounded shadow-md z-50 transition-all duration-300 ${
            pagesOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:group-hover:visible lg:group-hover:opacity-100`}
        >
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
              onClick={() => setPagesOpen(false)}
            >
              All
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/frontend"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
              onClick={() => setPagesOpen(false)}
            >
              React
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/server"
              className={({ isActive }) =>
                `block px-4 py-2 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 ${
                  isActive ? "bg-blue-200 font-semibold" : ""
                }`
              }
              onClick={() => setPagesOpen(false)}
            >
              Laravel
            </NavLink>
          </li>
        </ul>
      </li>

      {/* Contact */}
      <li className="pt-1">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `relative px-2 py-1 rounded transition-colors duration-300 hover:text-blue-600 ${
              isActive ? "text-blue-600 font-semibold" : ""
            }`
          }
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
};

export default Links;
