// components/Sidebar/DropdownMenu.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaChevronDown, FaPlus, FaList } from "react-icons/fa";

const DropdownMenu = ({ title, addPath, listPath }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="relative">
      <button
        className="btn bg-white text-black border-none w-full text-left flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span>{title}</span>
        <FaChevronDown className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul className="mt-2 bg-white shadow-lg rounded w-full space-y-1 z-10 absolute left-0">
          <li>
            <NavLink
              to={addPath}
              className="block px-4 py-2 hover:bg-gray-100 flex items-center"
            >
              <FaPlus className="mr-2" /> Add
            </NavLink>
          </li>
          <li>
            <NavLink
              to={listPath}
              className="block px-4 py-2 hover:bg-gray-100 flex items-center"
            >
              <FaList className="mr-2" /> All
            </NavLink>
          </li>
        </ul>
      )}
    </li>
  );
};

export default DropdownMenu;
