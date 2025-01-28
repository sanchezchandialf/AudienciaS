import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { NavLink } from "react-router-dom";

interface MenuItem {
  text: string;
  href: string;
}

export default function NavListDrawer({
  menuItems,
  setOpen,
}: {
  menuItems: MenuItem[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Box sx={{ width: 250,
      "& .MuiListItemButton-root:hover": {
        backgroundColor: "#f56df9",
        color: "#fff",
      },
     }}>
      <nav>
        <List>
          {menuItems.map((item) => (
            <ListItem disablePadding key={item.text}>
              <ListItemButton
                component={NavLink}
                to={item.href}
                sx={{ textDecoration: "none", width: "100%" }}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
