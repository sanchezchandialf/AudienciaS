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
import { useEffect, useState } from "react";

import { FetchApi } from "../../api/useAxios";
import Empleados, { Cargo, Clasificaciones, Estado } from "../../Types/Types";
import { data } from "react-router-dom";
import Audiencia from "../../Types/Types";

export default function Form() {
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Audiencia>();
  const [empleados, setEmpleados] = useState<Empleados[]>([]);
  const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
  const [cargo, setCargo] = useState<Cargo[]>([]);
  const [clasificaciones, setClasificaciones] = useState<Clasificaciones[]>([]);
  const [estado, setEstado] = useState<Estado[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Maneja la carga de los empleados en el form 
   const fetchData=async()=>{
    
    try {
        const [empleadoRes,cargoRes,clasificacionesRes,estadoRes]=await Promise.all([
          FetchApi<Empleados[]>({ path: "/Empleado", method: "GET" }),
          FetchApi<Cargo[]>({ path: "/Cargo", method: "GET" }),
          FetchApi<Clasificaciones[]>({ path: "/Clasificaciones", method: "GET" }),
          FetchApi<Estado[]>({ path: "/Estado", method: "GET" })

        ]);
     
      console.log(clasificacionesRes.data)
      if (empleadoRes.code === 200 && empleadoRes.data) setEmpleados(empleadoRes.data);
      if (cargoRes.code === 200 && cargoRes.data) setCargo(cargoRes.data);
      if (clasificacionesRes.code === 200 && clasificacionesRes.data) setClasificaciones(clasificacionesRes.data);
      if (estadoRes.code === 200 && estadoRes.data) setEstado(estadoRes.data);
    } catch (error) {
      console.error("error al obtener datos ",error)
    }
   };
   fetchData();
  }, []);

  const handleSnackbarClose = () => {
   
    setSnackbarOpen(false);
  };

  const onSubmit=async (data:Audiencia)=>{

    const formattedData = {
      ...data,
      fecha: new Date(data.fecha).toISOString(), 
      idCargo: Number(data.idCargo),
      idClasificacion: Number(data.idClasificacion),
      atendidoPor: Number(data.atendidoPor),
    };
    console.log("Datos enviados al back",formattedData)
    try{
      console.log("formulario enviado",data);
      const response=await FetchApi<Audiencia>({
        path:"/Form",
        method: "POST",
        payload:formattedData,
     

      });
      if ((response.code ===200 || response.code ===201) && response.data){
        setSnackbarOpen(true);
        console.log("enviado correctamente",response.data)
        reset();
      }else{
        console.error("error al enviar el formulario",response)
      }
    }catch(error){

    }
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
                  InputLabelProps={{ shrink: true }}
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
          <FormControl fullWidth error={!!errors.atendidoPor} sx={{ mb: 2 }}>
            <InputLabel>Empleado</InputLabel>
            <Select {...field} label="Empleado">
              {empleados.map((empleado) => (
                <MenuItem key={empleado.idEmpleado} value={empleado.idEmpleado}>
                  {empleado.nombre} {/* Ajusta según los datos de tu API */}
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
          <FormControl fullWidth error={!!errors.idCargo} sx={{ mb: 2 }}>
            <InputLabel>Cargos</InputLabel>
            <Select {...field} label="Cargo">
              {cargo.map((cargos) => (
                <MenuItem key={cargos.idCargo} value={cargos.idCargo}>
                  {cargos.nombreCargo} {/* Ajusta según los datos de tu API */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
         <Controller
        name="idClasificacion"
        control={control}
        rules={{ required: "Seleccione una clasificacion" }}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.idClasificacion} sx={{ mb: 2 }}>
            <InputLabel>Clasificaciones</InputLabel>
            <Select {...field} label="Clasificaciones">
              {clasificaciones.map((clasificacion) => (
                <MenuItem key={clasificacion.idclasificacion} value={clasificacion.idclasificacion}>
                  {clasificacion.clasificacion} {/* Ajusta según los datos de tu API */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
       <Controller
        name="idEstado"
        control={control}
        rules={{ required: "Seleccione un estado" }}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors.idEstado} sx={{ mb: 2 }}>
            <InputLabel>Estado</InputLabel>
            <Select {...field} label="Estado">
              {estado.map((est) => (
                <MenuItem key={est.idestado} value={est.idestado}>
                  {est.nombre} {/* Ajusta según los datos de tu API */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

         {/* Botón de envío */}
         <Button type="submit" variant="contained" size="large" sx={{ width: "100%", backgroundColor: "#5059bc", mt: 2 }} disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : "Enviar Solicitud"}
      </Button>

      {/* Mensajes de éxito y error */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert severity="success">Formulario enviado correctamente</Alert>
      </Snackbar>

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </Box>
  );
}