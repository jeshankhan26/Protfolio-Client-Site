// components/Sidebar/Sidebar.jsx
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../Provider/AuthContext';
import { auth } from '../../Provider/firebase.init';
import DropdownMenu from './DropdownMenu';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(auth);
  };

  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const sidebarContent = (
    <ul className="space-y-2">
      <li>
        <NavLink to="/dashboard" className="btn bg-white text-black border-none w-full justify-start">
          Home
        </NavLink>
      </li>

      {/* Reusable Dropdown Menus */}
      <DropdownMenu title="Skills" addPath="/dashboard/addskill" listPath="/dashboard/allskill" />
      <DropdownMenu title="Feather" addPath="/dashboard/addfeather" listPath="/dashboard/allfeather" />
      <DropdownMenu title="Education" addPath="/dashboard/addeducation" listPath="/dashboard/alleducation" />
      {/* <DropdownMenu title="Profession" addPath="/dashboard/addprofession" listPath="/dashboard/allprofession" /> */}
      <DropdownMenu title="Experience" addPath="/dashboard/addexperience" listPath="/dashboard/allexperience" />
      <DropdownMenu title="Portfolio" addPath="/dashboard/addportfolio" listPath="/dashboard/allportfolio" />
      <DropdownMenu title="About" addPath="/dashboard/addabout" listPath="/dashboard/addabout" />

      <li>
        <button
          onClick={handleLogout}
          className="btn bg-white text-black border-none w-full text-left justify-start"
        >
          Logout
        </button>
      </li>
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 p-4 hidden lg:block bg-blue-100 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        {sidebarContent}
      </aside>

      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button className="btn btn-square btn-outline" onClick={toggleDrawer}>
          {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-blue-200 bg-opacity-30 z-40" onClick={toggleDrawer}>
          <div
            className="w-64 h-full p-4 bg-blue-100 absolute left-0 top-0"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 mt-9">Dashboard</h2>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
