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
import { NavLink } from "react-router-dom";
import LogoS from "../../assets/LogoS.png";

interface menuItems {
  text: string;
  href: string;
}

interface NavbarProps {
  menuItems: menuItems[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#f26df9" }}>
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
                src={LogoS}
                alt="Logo"
                style={{
                  height: "100px",
                  marginRight: "16px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menuItems.map((link) => (
              <Button
                key={link.text}
                sx={{ color: "#fff", mx: 1 }}
                component={NavLink}
                to={link.href}
              >
                {link.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

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
