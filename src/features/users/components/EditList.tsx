import { useEffect, useState } from "react";
import { FetchApi } from "../../../api/useAxios";
import Audiencia, { Cargo, Clasificaciones, Estado  } from "../../../Types/Types";
import Empleados from  "../../../Types/Types";
import { Box, Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select,  Snackbar, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";

const EditList = () => {
  const location = useLocation();
  
  const { audienciasSeleccionadas } = location.state || { audienciasSeleccionadas: [] };

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  // Estados para cargar listas
  const [empleados, setEmpleados] = useState<Empleados[]>([]);
  const [cargo, setCargo] = useState<Cargo[]>([]);
  const [clasificaciones, setClasificaciones] = useState<Clasificaciones[]>([]);
  const [estado, setEstado] = useState<Estado[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      audiencias: audienciasSeleccionadas,
    },
  });

  useEffect(() => {
    reset({ audiencias: audienciasSeleccionadas });

    const fetchData = async () => {
      try {
        const [empleadoRes, cargoRes, clasificacionesRes, estadoRes] = await Promise.all([
          FetchApi<Empleados[]>({ path: "/Empleado", method: "GET" }),
          FetchApi<Cargo[]>({ path: "/Cargo", method: "GET" }),
          FetchApi<Clasificaciones[]>({ path: "/Clasificaciones", method: "GET" }),
          FetchApi<Estado[]>({ path: "/Estado", method: "GET" }),
        ]);

        if (empleadoRes.code === 200 && empleadoRes.data) setEmpleados(empleadoRes.data);
        if (cargoRes.code === 200 && cargoRes.data) setCargo(cargoRes.data);
        if (clasificacionesRes.code === 200 && clasificacionesRes.data) setClasificaciones(clasificacionesRes.data);
        if (estadoRes.code === 200 && estadoRes.data) setEstado(estadoRes.data);
      } catch (error) {
        console.error("Error al obtener datos", error);
        setError("Error al obtener datos");
      }
    };

    fetchData();
  }, [audienciasSeleccionadas, reset]);

  const onSubmit = async (data: { audiencias: Audiencia[] }) => {
    setLoading(true);
    setError(null);

    try {
      for (const audiencia of data.audiencias) {
        const formattedData = {
          ...audiencia,
          fecha: new Date(audiencia.fecha).toISOString(),
          idCargo: Number(audiencia.idCargo),
          idClasificacion: Number(audiencia.idClasificacion),
          atendidoPor: String(audiencia.atendidoPor),
          idEstado: Number(audiencia.idEstado),
        };

        const response = await FetchApi<Audiencia>({
          path: `/Form/${audiencia.idAudiencia}`,
          method: "PUT",
          requiresAuth: true,
          token: token || "",
          payload: formattedData,
        });

        if (response.code !== 200) {
          throw new Error(`Error al actualizar la audiencia ${audiencia.idAudiencia}: ${response.message}`);
        }
      }
      setSnackbarOpen(true);
      
    } catch (error) {
      console.error("Error en la actualización", error);
      setError("Error en la actualización");
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: 4,
        maxWidth: 600,
        margin: "64px auto",
        backgroundColor: "#00203a",
        borderRadius: 2,
        color: "white",
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>Editar Audiencia</Typography>

      {error && <Typography color="error">{error}</Typography>}

      {audienciasSeleccionadas.map((audiencia: Audiencia, index: number) => (
        <Box key={audiencia.idAudiencia} sx={{ mb: 3, p: 2, border: "1px solid white", borderRadius: 1 }}>
          <Typography variant="h6">Audiencia {audiencia.idAudiencia}</Typography>

          <Controller name={`audiencias.${index}.nombreEmpresa`} control={control} render={({ field }) => <TextField {...field} label="Nombre Empresa" fullWidth sx={{ mb: 2 }} />} />

          <Controller name={`audiencias.${index}.fecha`} control={control} render={({ field }) => <TextField {...field} label="Fecha" type="date" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />} />

          <Controller name={`audiencias.${index}.derivadoA`} control={control} render={({ field }) => <TextField {...field} label="Derivado A" fullWidth sx={{ mb: 2 }} />} />

          <Controller name={`audiencias.${index}.asunto`} control={control} render={({ field }) => <TextField {...field} label="Asunto" fullWidth sx={{ mb: 2 }} multiline rows={4} />} />

          <Controller name={`audiencias.${index}.atendidoPor`} control={control} render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Atendido Por</InputLabel>
              <Select {...field}>
                {empleados.map((empleado) => <MenuItem key={empleado.idEmpleado} value={empleado.idEmpleado}>{empleado.nombre}</MenuItem>)}
              </Select>
            </FormControl>
          )} />

          <Controller name={`audiencias.${index}.idCargo`} control={control} render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Cargo</InputLabel>
              <Select {...field}>
                {cargo.map((c) => <MenuItem key={c.idCargo} value={c.idCargo}>{c.nombreCargo}</MenuItem>)}
              </Select>
            </FormControl>
          )} />

          <Controller name={`audiencias.${index}.idClasificacion`} control={control} render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Clasificación</InputLabel>
              <Select {...field}>
                {clasificaciones.map((clasificacion) => <MenuItem key={clasificacion.idclasificacion} value={clasificacion.idclasificacion}>{clasificacion.clasificacion}</MenuItem>)}
              </Select>
            </FormControl>
          )} />

          <Controller name={`audiencias.${index}.idEstado`} control={control} render={({ field }) => (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Estado</InputLabel>
              <Select {...field}>
                {estado.map((est) => <MenuItem key={est.idestado} value={est.idestado}>{est.nombre}</MenuItem>)}
              </Select>
            </FormControl>
          )} />
        </Box>
      ))}

      <Button type="submit" variant="contained" color="primary" disabled={loading}>{loading ? "Guardando..." : "Editar"}</Button>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity="success">Audiencia actualizada correctamente</Alert>
      </Snackbar>
    </Box>
  );
};

export default EditList;
