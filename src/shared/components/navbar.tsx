import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import logoedit from "../../assets/logoedit.png";
import { useAuth } from "../../context/useAuth";

interface MenuItem {
  text: string;
  href: string;
}

interface NavbarProps {
  menuItems: MenuItem[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate("/estadisticas");
  };

  const handleredirect2 = () => {
    navigate("/form");
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={4}
        sx={{
          backgroundColor: "#f26df9",
          borderRadius: "2px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setOpen(true)}
              sx={{ mr: 2, display: { sm: "none", xs: "block" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "left" }}>
              <img
                src={logoedit}
                alt="Logo"
                style={{
                  height: "70px",
                  marginTop: "15px",
                  marginBottom: "15px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>

          {/* Menú de navegación */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menuItems.map((link) => (
                <Button
                key={link.text}
                sx={{ color: "#fff", mx: 1, ":hover": { backgroundColor: " #c8d29c" } }}
                component={NavLink}
                to={link.href}
              >
                {link.text}
              </Button>
            ))}
            {/* si el usuario esta logueado muestra  este boton  */}
            {user && (
              <Button
              sx={{
                color: "#fff",
                mx: 1,
                ":hover": { backgroundColor: " #c8d29c" },
              }}
              onClick={handleredirect2}
              >
              Gestionar Audiencia
              </Button>
            )}
             {/* si el usuario esta logueado muestra  este boton  */}
             {user && (
              <Button
              sx={{
                color: "#fff",
                mx: 1,
                ":hover": { backgroundColor: " #c8d29c" },
              }}
              onClick={handleredirect}
              >
              Mi Gestion
              </Button>
            )}
            {/* si el usuario esta logueado muestra  este boton  */}
            {user && (
              <Button
              sx={{
                color: "#fff",
                mx: 1,
                ":hover": { backgroundColor: " #c8d29c" },
              }}
              onClick={handleLogout}
              >
              Salir
              </Button>
            )}
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer para móvil */}
      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <NavListDrawer menuItems={menuItems} setOpen={setOpen} />
      </Drawer>
    </>
  );
}
