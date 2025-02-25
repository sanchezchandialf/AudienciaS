import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    CircularProgress,
    Snackbar,
    Alert,
  } from "@mui/material";
  import { Controller, useForm } from "react-hook-form";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { FetchApi } from "../../../api/useAxios";
  import {  Cargo, Clasificaciones, Estado } from "../../../Types/Types";
  import Audiencia from "../../../Types/Types";
  import Empleados from "../../../Types/Types";

  export default function EditForm() {
    const { id } = useParams<{ id: string }>();
    const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<Audiencia>();
    
    const [empleados, setEmpleados] = useState<Empleados[]>([]);
    const [cargos, setCargos] = useState<Cargo[]>([]);
    const [clasificaciones, setClasificaciones] = useState<Clasificaciones[]>([]);
    const [estados, setEstados] = useState<Estado[]>([]);
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [
            empleadosRes, 
            cargosRes, 
            clasificacionesRes, 
            estadosRes,
            audienciaRes
          ] = await Promise.all([
            FetchApi<Empleados[]>({ path: "/Empleado", method: "GET" }),
            FetchApi<Cargo[]>({ path: "/Cargo", method: "GET" }),
            FetchApi<Clasificaciones[]>({ path: "/Clasificaciones", method: "GET" }),
            FetchApi<Estado[]>({ path: "/Estado", method: "GET" }),
            id ? FetchApi<Audiencia>({ path: `/Form/${id}`, method: "GET" }) : Promise.resolve(null)
          ]);
  
          // Cargar datos estáticos
          if (empleadosRes.data) setEmpleados(empleadosRes.data);
          if (cargosRes.data) setCargos(cargosRes.data);
          if (clasificacionesRes.data) setClasificaciones(clasificacionesRes.data);
          if (estadosRes.data) setEstados(estadosRes.data);
  
          // Cargar datos de la audiencia si existe ID
          if (id && audienciaRes?.data) {
            const formattedData = {
              ...audienciaRes.data,
              fecha: new Date(audienciaRes.data.fecha).toISOString().split('T')[0],
              idCargo: Number(audienciaRes.data.idCargo),
              idClasificacion: Number(audienciaRes.data.idClasificacion),
              atendidoPor: Number(audienciaRes.data.atendidoPor),
              estado: audienciaRes.data.estado.toString()
            };
            reset(formattedData);
          }
  
          setLoading(false);
        } catch (error) {
          setError("Error al cargar los datos");
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id, reset]);
  
    const onSubmit = async (data: Audiencia) => {
        const token = localStorage.getItem("token");
        try {
        const formattedData = {
          ...data,
          fecha: new Date(data.fecha).toISOString(),
          idCargo: Number(data.idCargo),
          idClasificacion: Number(data.idClasificacion),
          atendidoPor: Number(data.atendidoPor),
          estado: Number(data.estado)
        };
  
        const response = await FetchApi({
          path: `/Form/${id}`,
          method: "PUT",
          requiresAuth: true,
          token: token || "",
          payload: formattedData
        });
  
        if (response.code === 200) {
          setSnackbarOpen(true);
        } else {
          setError("Error al actualizar la audiencia");
        }
      } catch (error) {
        setError("Error de conexión");
      }
    };
  
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
  
    return (
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            p: 4,
            maxWidth: 500,
            margin: "64px auto",
            backgroundColor: "#00203a",
            borderRadius: 2,
          }}
        >
          <Controller
            name="correoElectronico"
            control={control}
            rules={{ required: "Email es requerido", pattern: /^\S+@\S+$/i }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Correo electrónico"
                fullWidth
                margin="normal"
                error={!!errors.correoElectronico}
                helperText={errors.correoElectronico?.message?.toString()}
              />
            )}
          />
      
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
                margin="normal"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.fecha}
                helperText={errors.fecha?.message?.toString()}
              />
            )}
          />
      
          <Controller
            name="dni"
            control={control}
            rules={{
              required: "DNI es requerido",
              pattern: { value: /^[0-9]{8,10}$/, message: "DNI inválido" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="DNI"
                fullWidth
                margin="normal"
                error={!!errors.dni}
                helperText={errors.dni?.message?.toString()}
              />
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
                margin="normal"
                error={!!errors.nombreEmpresa}
                helperText={errors.nombreEmpresa?.message?.toString()}
              />
            )}
          />
      
          <Controller
            name="derivadoA"
            control={control}
            rules={{ required: "Complete este campo" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Derivado a"
                fullWidth
                margin="normal"
                error={!!errors.derivadoA}
                helperText={errors.derivadoA?.message?.toString()}
              />
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
                margin="normal"
                multiline
                rows={4}
                error={!!errors.asunto}
                helperText={errors.asunto?.message?.toString()}
              />
            )}
          />
      
          <Controller
            name="atendidoPor"
            control={control}
            rules={{ required: "Seleccione un empleado" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.atendidoPor}>
                <InputLabel>Empleado</InputLabel>
                <Select {...field} label="Empleado">
                  {empleados.map((empleado) => (
                    <MenuItem key={empleado.idEmpleado} value={empleado.idEmpleado}>
                      {empleado.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
      
          <Controller
            name="idCargo"
            control={control}
            rules={{ required: "Seleccione un cargo" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.idCargo}>
                <InputLabel>Cargos</InputLabel>
                <Select {...field} label="Cargo">
                  {cargos.map((cargo) => (
                    <MenuItem key={cargo.idCargo} value={cargo.idCargo}>
                      {cargo.nombreCargo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
      
          <Controller
            name="idClasificacion"
            control={control}
            rules={{ required: "Seleccione una clasificación" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.idClasificacion}>
                <InputLabel>Clasificaciones</InputLabel>
                <Select {...field} label="Clasificaciones">
                  {clasificaciones.map((clasificacion) => (
                    <MenuItem
                      key={clasificacion.idclasificacion}
                      value={clasificacion.idclasificacion}
                    >
                      {clasificacion.clasificacion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
      
          <Controller
            name="estado"
            control={control}
            rules={{ required: "Seleccione un estado" }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.estado}>
                <InputLabel>Estado</InputLabel>
                <Select {...field} label="Estado">
                  {estados.map((est) => (
                    <MenuItem key={est.idestado} value={est.idestado}>
                      {est.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
      
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: "100%", backgroundColor: "#5059bc", mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Actualizar Audiencia"}
          </Button>
      
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <Alert severity="success">Audiencia actualizada correctamente</Alert>
          </Snackbar>
      
          <Snackbar
            open={!!error}
            autoHideDuration={6000}
            onClose={() => setError(null)}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        </Box>
      );
  }