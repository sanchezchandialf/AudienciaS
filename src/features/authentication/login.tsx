import React from 'react';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/useAuth';
import { Box, Button, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

type FormValues = {
  email: string;
  password: string;
};

// Esquema de validación con Yup
const validationSchema = yup.object().shape({
  email: yup.string().email("Correo inválido").required("Correo es requerido"),
  password: yup.string().required("Contraseña es requerida"),
});

const LoginPage: FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: { email: "", password: "" }, // ✅ Evita valores undefined
  });

  const { loginUser } = useAuth();

  const handleLogin = async (form: FormValues) => {
    try {
      await loginUser(form.email, form.password);
      toast.success("Inicio de sesión exitoso");
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",  // ✅ FIX: corregido "allignItems"
        p: 4,
        maxWidth: "800px",
        margin: "60px auto 0",
        width: "60%",
        boxSizing: "border-box",
        paddingTop: "10px",
        "& .MuiInputLabel-root": { color: "#fff" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#063565" },
          "&:hover fieldset": { borderColor: "#c8d29c" },
          "&.Mui-focused fieldset": { borderColor: "#c8d29c" },
        },
        "& .MuiInputBase-input": { color: "#fff" }, // ✅ FIX: corregido "fff" a "#fff"
      }}
    >
      <Typography
        variant="h4"
        color="secondary"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          margin: "auto",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "100%",
        }}
      >
        Login
      </Typography>

 
      <Box sx={{ display: "flex", paddingBottom: 2, flexDirection: "column", gap: 2, width: "100%", margin: "auto", justifyContent: "center", alignItems: "center", maxWidth: "100%" }}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Correo"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
      </Box>

      <Box paddingBottom={2} sx={{ display: "flex", paddingBottom: 2, flexDirection: "column", gap: 2, width: "100%", margin: "auto", justifyContent: "center", alignItems: "center", maxWidth: "100%" }}>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Contraseña"
              type="password"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
      </Box>

      {/* Botón de Iniciar Sesión */}
      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 300,
          backgroundColor: "#5059bc",
          color: "#fff",  // ✅ FIX: antes tenía "secondary"
          ":hover": { backgroundColor: "#063565" },
          paddingTop: "10px",
          paddingBottom: "10px",
          marginTop: "20px",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
};

export default LoginPage;
