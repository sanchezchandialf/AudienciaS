import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";

import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
enum CargoOptions {
  funcionario = "Funcionario",
  dirigente = "Dirigente",
  empresario = "Empresario",
  ciudadano = "Ciudadano",
  medios = "Medios de comunicación",
}

enum ClasificacionOptions {
  Solicitud = "Solicitud",
  Atendida = "Atendida",
  Planificada = "Planificada",
  Derivada = "Derivada",
  Denegada = "Denegada",
  Reprogramada = "Reprogramada",
}

enum Personas {
  MarcosResico = "Marcos Resico",
  KarenKaenel = "Karen Kaenel",
  PaolaGomez = "Paola Gómez",
  EdgardoRuizDiaz = "Edgardo Ruiz Diaz",
  Otros = "Otros",
}

enum Estado {
  Resuelta = "Resuelta",
  EnGestion = "En Gestión",
  Rechazada = "Rechazada",
}

const enviadoOptions = ["Gobernación", "Vicegobernación"] as const;

type FormData = {
  fecha: string;
  email: string;
  nombre: string;
  dni: string;
  contacto: string;
  cargo: CargoOptions;
  nombreEmpresa: string;
  asunto: string;
  enviadoDesde: (typeof enviadoOptions)[number];
  clasificacion: ClasificacionOptions;
  derivadaA: string;
  atendidoPor: Personas;
  estado: Estado;
};

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      cargo: CargoOptions.funcionario,
      estado: Estado.EnGestion,
    },
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };
  const onSubmit = async (data: FormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Formulario enviado:", data);
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarOpen(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Formulario de Audiencias
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          mb: 4,
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email es requerido", pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Box sx={{ display: "flex", gap: 3 }}>
            <Controller
              name="fecha"
              control={control}
              rules={{ required: "Fecha es requerida" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fecha"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.fecha}
                  helperText={errors.fecha?.message}
                />
              )}
            />

            <Controller
              name="dni"
              control={control}
              rules={{
                required: "DNI es requerido",
                pattern: {
                  value: /^[0-9]{8,10}$/,
                  message: "DNI inválido",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="DNI"
                  fullWidth
                  error={!!errors.dni}
                  helperText={errors.dni?.message}
                />
              )}
            />
          </Box>

          <Controller
            name="cargo"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.cargo}>
                <InputLabel>Cargo</InputLabel>
                <Select {...field} label="Cargo">
                  {Object.values(CargoOptions).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="nombreEmpresa"
            control={control}
            rules={{ required: "Nombre de empresa es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre de la empresa"
                fullWidth
                error={!!errors.nombreEmpresa}
                helperText={errors.nombreEmpresa?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <Controller
            name="clasificacion"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.clasificacion}>
                <InputLabel>Clasificación</InputLabel>
                <Select {...field} label="Clasificación">
                  {Object.values(ClasificacionOptions).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="derivadaA"
            control={control}
            rules={{ required: "Complete este campo" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Derivado a"
                fullWidth
                error={!!errors.derivadaA}
                helperText={errors.derivadaA?.message}
              />
            )}
          />
          <Controller
            name="atendidoPor"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.atendidoPor}>
                <InputLabel>Atendido por</InputLabel>
                <Select {...field} label="Atendido por">
                  {Object.values(Personas).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="estado"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.estado}>
                <InputLabel>Estado</InputLabel>
                <Select {...field} label="Estado">
                  {Object.values(Estado).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="asunto"
            control={control}
            rules={{ required: "Asunto es requerido" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Asunto"
                fullWidth
                multiline
                rows={4}
                error={!!errors.asunto}
                helperText={errors.asunto?.message}
              />
            )}
          />
        </Box>
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        sx={{ width: 300 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? <CircularProgress size={24} /> : "Enviar Solicitud"}
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={(e) => handleSnackbarClose(e, "manual")}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Formulario enviado correctamente!
        </Alert>
      </Snackbar>
    </Box>
  );
}
