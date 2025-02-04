import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';


const Layout: React.FC = () => {
    return (
       <>
        <Navbar menuItems={[
            { text: "Inicio", href: "/" },
            { text: "Login", href: "/login" }
          ]} />,
        <Outlet />
       </>
           
        
    );
};

export default Layout;