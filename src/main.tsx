import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import theme from "./shared/components/theme.tsx";
import router from "./router/Router.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);