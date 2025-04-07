import { useState, useCallback } from "react";
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
  const [form, setForm] = useState<PassDTO>({
    ClaveActual: "",
    ClaveNueva: "",
  });

  const [feedback, setFeedback] = useState<{ mensaje: string; tipo: "success" | "error" } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFeedback(null);

      const response = await FetchApi({
        path: "/Usuario/editpass",
        method: "PUT",
        payload: form,
        requiresAuth: true,
        token: localStorage.getItem("token") || "",
      });

      if (response.code === 200) {
        setFeedback({ tipo: "success", mensaje: "Contraseña actualizada correctamente" });
      } else {
        setFeedback({ tipo: "error", mensaje: response.message });
      }
    },
    [form]
  );

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
            name="ClaveActual"
            value={form.ClaveActual}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Nueva Contraseña"
            type="password"
            name="ClaveNueva"
            value={form.ClaveNueva}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Actualizar
          </Button>
        </form>
        {feedback && (
          <Alert severity={feedback.tipo} sx={{ mt: 3 }}>
            {feedback.mensaje}
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default UpdatePassword;
