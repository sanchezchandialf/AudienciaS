import React from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        p={4}
        paddingTop={0}
        sx={{
          "& .MuiInputLabel-root": {
            color: "#fff", // Color inicial del label
            "&.Mui-focused": {
              color: "#c8d29c", // Color del label al enfocarse
            },
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#063565", // Borde inicial
            },
            "&:hover fieldset": {
              borderColor: "#c8d29c", // Borde al pasar el mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#c8d29c", // Borde al enfocarse
            },
          },
          "& .MuiInputBase-input": {
            color: "#fff", // Color del texto dentro del campo
          },
          "& .MuiSelect-icon": {
            color: "#c8d29c", // Color del icono del select (si usas uno)
          },
          "& .MuiMenuItem-root": {
            color: "#c8d29c", // Color de las opciones del menú
          },
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom color="#c8d29c">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 5,
           
            color: "#fff", // Color del texto del botón
            "&:hover": {
              backgroundColor: "#c8d29c", // Color de fondo al pasar el mouse
              color: "#063565", // Color del texto al pasar el mouse
            },
          }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
