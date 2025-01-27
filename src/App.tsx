import Navbar from "./shared/components/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./features/home/home";
import LoginPage from "./features/authentication/login";
import Form from "./features/form/form";
import { GlobalStyles } from '@mui/material';

interface menuItems {
  text: string;
  href: string;
}

const menuItems = [
  { text: "Inicio", href: "/" },
  { text: "Login", href: "/login" },
];
export default function App() {
  return (
    <>
      <Navbar menuItems={menuItems} />
      <GlobalStyles
        styles={{
          'body': {
            margin: 0,
            padding: 0,
            minHeight: '100vh',
            backgroundColor: '#00203a',
          }
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/form" element={<Home />} />
        <Route path="/audiencias" element={<Form />} />
      </Routes>
    </>
  );
}
