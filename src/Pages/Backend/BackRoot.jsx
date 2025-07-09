import React from 'react';
import BackNavbar from '../../Components/Backend/BackNavbar';
import { Outlet } from 'react-router';
import Sidebar from '../../Components/Backend/Sidebar';

const BackRoot = () => {
    return (
        <>
        <div className="lg:flex min-h-screen">
  {/* Sidebar */}
  <div className="w-64 ">
    <Sidebar />
  </div>

  {/* Main Content Area */}
  <div className="flex flex-col flex-1">
    {/* Navbar */}
    <div className="h-16">
      <BackNavbar />
    </div>

    {/* Page Content */}
    <div className="flex-1 p-4 overflow-auto">
      <Outlet />
    </div>
  </div>
</div>

      
    
        
            
        </>
    );
};

export default BackRoot;