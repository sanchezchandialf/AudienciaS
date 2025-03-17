import { useEffect, useState } from "react"
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";

const Edit = (list: Audiencia[]) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
    
    
    const {
        control,
        handleSubmit,
        reset,
    } = useForm<Audiencia>();
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchAudiencias = async () => {

            const response = await FetchApi<Audiencia[]>({
                path: "/Form",
                method: "GET",
                requiresAuth: true,
                token: token || "",

            })
            if (response.code === 200 && response.data) {
                setAudiencias(response.data);

            } else {
                setError(response.message || "Error al cargar los datos.");
            }
            setLoading(false);

        }
        fetchAudiencias();

        const onSubmit = async (data: Audiencia) => {

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
                    path: `/Form/${data.idAudiencia}`,
                    method: "PUT",
                    requiresAuth: true,
                    token: token || "",
                    payload: formattedData,
                });



            } catch (error) {
                console.error("Error en la actualización", error);
                setError("Error en la actualización");
            }
        }


    }, [reset]);

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
        />

    )


}