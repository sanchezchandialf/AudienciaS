// App.tsx (componente principal de layout)
import Navbar from "./shared/components/navbar";
import { Outlet } from "react-router-dom";
import { GlobalStyles } from "@mui/material";

export default function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            margin: 0,
            padding: 0,
            minHeight: "100vh",
            backgroundColor: "#00203a"
          }
        }}
      />
      
      <Outlet />
    </>
  );
}