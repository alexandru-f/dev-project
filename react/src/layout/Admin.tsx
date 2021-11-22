import React from 'react';
import SideBar from '../components/sidebar/SideBar';
import { Outlet } from 'react-router';
const Admin = () => {
    return (
      <>
      <SideBar />
      <div className="relative md:ml-64 bg-blueGray-100">

        <Outlet />
      </div>
    </>
    );
} 

export default Admin;