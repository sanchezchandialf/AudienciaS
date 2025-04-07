import { useState } from "react";

import {
  TextField,
  Button,
  Alert,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { FetchApi } from "../../../api/useAxios";



interface PassDTO {
  ClaveActual: string;
  ClaveNueva: string;
}


const UpdatePassword = () => {
  const [claveActual, setClaveActual] = useState("");
  const [claveNueva, setClaveNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error">("success");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");

    const payload: PassDTO = {
     
      ClaveActual: claveActual,
      ClaveNueva: claveNueva,
    };

    const response = await FetchApi({
      path: "/Usuario/editpass",
      method: "PUT",
      payload,
      requiresAuth: true,
      token: localStorage.getItem("token") || "",
    });

    if (response.code === 200) {
      setTipoMensaje("success");
      setMensaje(" Contraseña actualizada correctamente");
    } else {
      setTipoMensaje("error");
      setMensaje(` ${response.message}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: "background.paper" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Actualizar Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
        
          <TextField
            label="Contraseña Actual"
            type="password"
            value={claveActual}
            onChange={(e) => setClaveActual(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Nueva Contraseña"
            type="password"
            value={claveNueva}
            onChange={(e) => setClaveNueva(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Actualizar
          </Button>
        </form>
        {mensaje && (
          <Alert severity={tipoMensaje} sx={{ mt: 3 }}>
            {mensaje}
          </Alert>
        )}
      </Box>
    </Container>
  );
};


export default UpdatePassword;
