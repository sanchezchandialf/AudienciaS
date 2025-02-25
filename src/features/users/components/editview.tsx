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
import { useParams, useNavigate, BrowserRouter } from "react-router-dom";
import { FetchApi } from "../../../api/useAxios";
import Audiencia, { Cargo, Clasificaciones, Estado } from "../../../Types/Types";
import Empleados from "../../../Types/Types";
import { BrowserRoutes } from "../../../router/BrowserRoutes";
export default function EditarAudiencia() {
    const { id } = useParams<{ id: string }>(); // Obtener el id de la audiencia desde la URL
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Audiencia>();

    const [empleados, setEmpleados] = useState<Empleados[]>([]);
    const [cargo, setCargo] = useState<Cargo[]>([]);
    const [clasificaciones, setClasificaciones] = useState<Clasificaciones[]>([]);
    const [estado, setEstado] = useState<Estado[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {

            const token = localStorage.getItem("token");
            try {
                // Obtener los datos de la audiencia a editar
                const audienciaRes = await FetchApi<Audiencia>({
                    path: `/Form/${id}`,
                    method: "GET",
                    requiresAuth: true,
                    token: token || "",
                });

                if ((audienciaRes.code === 200 || audienciaRes.code === 201) && audienciaRes.data) {
                    reset(audienciaRes.data); // Rellenar los campos con los datos obtenidos
                } else {
                    setError("Error al cargar la audiencia");
                }

                // Obtener datos para los selects
                const [empleadoRes, cargoRes, clasificacionesRes, estadoRes] =
                    await Promise.all([
                        FetchApi<Empleados[]>({ path: "/Empleado", method: "GET" }),
                        FetchApi<Cargo[]>({ path: "/Cargo", method: "GET" }),
                        FetchApi<Clasificaciones[]>({ path: "/Clasificaciones", method: "GET" }),
                        FetchApi<Estado[]>({ path: "/Estado", method: "GET" }),
                    ]);

                if (empleadoRes.code === 200 && empleadoRes.data) setEmpleados(empleadoRes.data);
                if (cargoRes.code === 200 && cargoRes.data) setCargo(cargoRes.data);
                if (clasificacionesRes.code === 200 && clasificacionesRes.data)
                    setClasificaciones(clasificacionesRes.data);
                if (estadoRes.code === 200 && estadoRes.data) setEstado(estadoRes.data);
            } catch (error) {
                console.error("Error al obtener datos", error);
                setError("Error al obtener datos");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, reset]);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const onSubmit = async (data: Audiencia) => {
        const token = localStorage.getItem("token");

        try {
            const formattedData = {
                ...data,
                fecha: new Date(data.fecha).toISOString(), // Convertir a formato ISO
                idCargo: Number(data.idCargo),
                idClasificacion: Number(data.idClasificacion),
                atendidoPor: Number(data.atendidoPor),
                idEstado: Number(data.idEstado),
            };

            const response = await FetchApi<Audiencia>({
                path: `/Form/${id}`,
                method: "PUT",
                requiresAuth: true,
                token: token || "",
                payload: formattedData,
            });

            if (response.code === 200 && response.data) {
                setSnackbarOpen(true);
                navigate(BrowserRoutes.MISAUDIENCIAS);
            } else {
                setError("Error al actualizar la audiencia");
            }
        } catch (error) {
            console.error("Error en la actualización", error);
            setError("Error en la actualización");
        }
    };


    if (loading) return <CircularProgress />;

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
            <Typography variant="h6" gutterBottom>Editar Audiencia</Typography>

            <Controller
                name="correoElectronico"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Correo electrónico" fullWidth />
                )}
            />

            <Controller
                name="fecha"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Fecha"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                            const fecha = e.target.value; // "YYYY-MM-DD" (formato del input date)
                            field.onChange(fecha); // Asignar directamente en formato ISO
                        }}
                    />
                )}
            />


            <Controller
                name="dni"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="DNI" fullWidth />
                )}
            />

            <Controller
                name="nombreEmpresa"
                control={control}
                render={({ field }) => (
                    <TextField {...field} label="Nombre de la empresa" fullWidth />
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
                render={({ field }) => (
                    <TextField {...field} label="Asunto" fullWidth multiline rows={4} />
                )}
            />

            <Controller
                name="atendidoPor"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Empleado</InputLabel>
                        <Select {...field}>
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
                name="idCargo"
                control={control}
                render={({ field }) => (
                    <FormControl fullWidth>
                        <InputLabel>Cargo</InputLabel>
                        <Select {...field}>
                            {cargo.map((c) => (
                                <MenuItem key={c.idCargo} value={c.idCargo}>{c.nombreCargo}</MenuItem>
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

            <Button
                type="submit"
                variant="contained"
                sx={{ width: "100%", mt: 2 }}
                disabled={isSubmitting}
            >
                {isSubmitting ? <CircularProgress size={24} /> : "Actualizar"}
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert severity="success">Audiencia actualizada correctamente</Alert>
            </Snackbar>

            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error">{error}</Alert>
                </Snackbar>
            )}
        </Box>
    );
}
