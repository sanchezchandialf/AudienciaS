import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import LogoS from "../../assets/LogoS.png";
import logoedit from "../../assets/logoedit.png";
import AuthorizedComponent from "../../router/AuthenticateRoute";
import { useEffect } from "react";
interface menuItems {
  text: string;
  href: string;
}

interface NavbarProps {
  menuItems: menuItems[];
}

export default function Navbar({ menuItems }: NavbarProps) {
  const [open, setOpen] = useState(false);


  const [userName, setUserName] = useState<string>('');
      //Es necesario Parsear el json para poder obtener los datos 
      useEffect(() => {
      
          const storedUser = localStorage.getItem('user');
          
          if (storedUser) {
            
              const userObj = JSON.parse(storedUser);
              
             
              setUserName(userObj.nombre); 
            
          }
      }, []);

  return (
    <>
      <AppBar position="static" elevation={4} sx={{ backgroundColor: "#f26df9",borderRadius:"2px",boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",overflow:"hidden" }}>
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
          <Box sx={{ display: { xs: "none", sm: "block" }}}> 
            {menuItems.map((link) => (
              <Button
                key={link.text}
                sx={{ color: "#fff", mx: 1 , ":hover": { backgroundColor: " #c8d29c" } }}
                component={NavLink}
                to={link.href}
              >
                {link.text}
              </Button>
            ))}
          </Box>
          <AuthorizedComponent requiredRole={true}>
          <Box>
              <Button>

                <Typography variant="h1">hola</Typography>
              </Button>

          </Box>

          </AuthorizedComponent>
        
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
