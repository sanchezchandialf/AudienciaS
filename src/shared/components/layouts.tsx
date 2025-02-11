import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { useAuth } from '../../context/useAuth';



const Layout: React.FC = () => {
  const { user } = useAuth(); // Usa el contexto para obtener el estado

  return (
    <>
      <Navbar
        menuItems={[
         ...(!user ?[{ text: "Inicio", href: "/" }] :[] ) ,
          ...(!user ? [{ text: "Login", href: "/login" }] : []), // Muestra Login solo si no hay usuario
        ]}
      />
      <Outlet />
    </>
  );
};

export default Layout;