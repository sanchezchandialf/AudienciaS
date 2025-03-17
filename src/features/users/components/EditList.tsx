import { useEffect, useState } from "react";
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { audienciasSeleccionadas } = location.state || { audienciasSeleccionadas: [] };
    
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            audiencias: audienciasSeleccionadas, // Inicializa con la lista recibida
        },
    });

    useEffect(() => {
        reset({ audiencias: audienciasSeleccionadas }); // Rellenar con valores actuales
    }, [audienciasSeleccionadas, reset]);

    const onSubmit = async (data: { audiencias: Audiencia[] }) => {
        setLoading(true);
        try {
            for (const audiencia of data.audiencias) {
                const formattedData = {
                    ...audiencia,
                    fecha: new Date(audiencia.fecha).toISOString(),
                    idCargo: Number(audiencia.idCargo),
                    idClasificacion: Number(audiencia.idClasificacion),
                    atendidoPor: Number(audiencia.atendidoPor),
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
                    throw new Error(`Error en la actualización de la audiencia ${audiencia.idAudiencia}`);
                }
            }
            alert("Actualización exitosa");
            navigate("/"); // Redirige a la lista después de editar
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

            {audienciasSeleccionadas.map((audiencia:Audiencia, index:number) => (
                <Box key={audiencia.idAudiencia} sx={{ mb: 3, p: 2, border: "1px solid white", borderRadius: 1 }}>
                    <Typography variant="h6">Audiencia {audiencia.idAudiencia}</Typography>

                    {/* Campo de Nombre Empresa */}
                    <Controller
                        name={`audiencias.${index}.nombreEmpresa`}
                        control={control}
                        defaultValue={audiencia.nombreEmpresa}
                        render={({ field }) => (
                            <TextField {...field} label="Nombre Empresa" fullWidth sx={{ mb: 2 }} variant="outlined" />
                        )}
                    />

                    {/* Campo de Estado */}
                    <Controller
                        name={`audiencias.${index}.estado`}
                        control={control}
                        defaultValue={audiencia.estado}
                        render={({ field }) => (
                            <TextField {...field} label="Estado" fullWidth sx={{ mb: 2 }} variant="outlined" />
                        )}
                    />

                    {/* Campo de Asunto */}
                    <Controller
                        name={`audiencias.${index}.asunto`}
                        control={control}
                        defaultValue={audiencia.asunto}
                        render={({ field }) => (
                            <TextField {...field} label="Asunto" fullWidth sx={{ mb: 2 }} variant="outlined" />
                        )}
                    />
                </Box>
            ))}

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Guardando..." : "Editar"}
            </Button>
        </Box>
    );
};

export default Edit;
