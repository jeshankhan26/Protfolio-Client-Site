import React from 'react';
import Navbar from '../../Components/Front/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Front/Footer';

const Root = () => {
    return (
        <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
            
        </>
    );
};

export default Root;