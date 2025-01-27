// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope, Arial, sans-serif", // Fuente por defecto para textos
    h1: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h1
      fontWeight: 500, // Medium
    },
    h2: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h2
      fontWeight: 500, // Medium
    },
    h3: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h3
      fontWeight: 500, // Medium
    },
    h4: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h4
      fontWeight: 400, // Regular
    },
    h5: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h5
      fontWeight: 400, // Regular
    },
    h6: {
      fontFamily: "Kanit, Arial, sans-serif", // Fuente para h6
      fontWeight: 400, // Regular
    },
    subtitle1: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para subtítulos
      fontWeight: 500, // Medium
    },
    subtitle2: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para subtítulos pequeños
      fontWeight: 400, // Regular
    },
    body1: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para textos normales
      fontWeight: 400, // Regular
    },
    body2: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para textos pequeños
      fontWeight: 400, // Regular
    },
    button: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para botones
      fontWeight: 500, // Medium
    },
    caption: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para caption
      fontWeight: 400, // Regular
    },
    overline: {
      fontFamily: "Manrope, Arial, sans-serif", // Fuente para overline
      fontWeight: 400, // Regular
    },
  },
  palette: {
    primary: {
      main: "#5059bc",
    },
    secondary: {
      main: "#f56df9",
    },
    background: {
      default: "#00203a",
      paper: "#063565",
    },
    text: {
      primary: "#ffffff",
      secondary: "#cccccc",
    },
  },
  
    components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              "& .MuiInputLabel-root": {
                color: "#fff", // Color del label
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#063565", // Color del borde
                },
                "&:hover fieldset": {
                  borderColor: "#5059bc", // Color del borde al hacer hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#f56df9", // Color del borde al estar enfocado
                },
              },
              "& .MuiInputBase-input": {
                color: "#fff", // Color del texto del input
              },
            },
          },
        },
        MuiSelect: {
          styleOverrides: {
            icon: {
              color: "#fff", // Color del ícono del Select
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              color: "#00203a", // Color del texto del MenuItem
            },
          },
        },
      },
  },
);

export default theme;