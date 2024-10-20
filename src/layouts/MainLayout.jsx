import { Outlet } from "react-router-dom";
import NavBar from '../components/Navbar';
import React from 'react';

const MainLayout = () => {
  return (
    <>
        <NavBar />
        <Outlet />
    </>
  )
}

export default MainLayout