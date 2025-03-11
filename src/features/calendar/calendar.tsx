import React, { useEffect, useState } from "react";
import { FetchApi } from "../../api/useAxios";
import Audiencia from "../../Types/Types";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

const Calendario: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);

    useEffect(() => {
        const fetchAudiencias = async () => {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            const response = await FetchApi<Audiencia[]>({
                path: "/Form",
                method: "GET",
                requiresAuth: true,
                token: token || "",
            });

            if (response.code === 200 && response.data) {
                setAudiencias(response.data);
            } else {
                setError(response.message || "Error al cargar los datos.");
            }
            setLoading(false);
        };

        fetchAudiencias();
    }, []);

    return (
        <Box display="flex" height="100vh">
            {/* 🗓️ Columna con el calendario */}
            <Box
                flex={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRight="1px solid #ddd"
                padding={3}
            >
                <Typography component="h1" variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
                    Calendario de Audiencias
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : error ? (
                    <Alert severity="error">{error}</Alert>
                ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={selectedDate}
                            onChange={(newValue) => setSelectedDate(newValue)}
                            sx={{ backgroundColor: 'white', width: '100%', borderRadius: '4px', color: 'black' }}
                            slots={{
                                day: (props) => {
                                    const { day, selected, ...other } = props;

                                    const audiencia = audiencias.find((a) => {
                                        const audienciaDate = dayjs(a.fecha, "DD/MM/YYYY");
                                        return audienciaDate.isSame(day, 'day');
                                    });

                                    return (
                                        <PickersDay
                                            {...props}
                                            {...other}
                                            selected={selected}
                                            sx={{
                                                backgroundColor: audiencia ? '#e57373' : selected ? '#1976d2' : 'transparent',
                                                color: audiencia ? 'black' : selected ? 'white' : 'black',
                                                borderRadius: '50%',
                                                fontWeight: audiencia ? 'bold' : 'normal',
                                                "&:hover": {
                                                    backgroundColor: audiencia ? "#d32f2f" : selected ? '#1565c0' : "rgba(0,0,0,0.1)",
                                                },
                                            }}
                                        />
                                    );
                                }
                            }}
                        />
                    </LocalizationProvider>
                )}
            </Box>
            {/* 📋 Panel derecho con información */}
            <Box flex={1} display="flex" flexDirection="column" padding={3}>
                <Typography component="h1" variant="h4" gutterBottom sx={{ marginBottom: 2, textAlign: 'center' }}>
                    {selectedDate
                        ? `Reuniones para el ${selectedDate.format("DD/MM/YYYY")}`
                        : 'Selecciona una fecha para ver reuniones'}
                </Typography>

                {selectedDate && (
                    <Box sx={{ width: "100%", maxHeight: "70vh", overflowY: "auto", marginTop: 2 }}>
                        {audiencias
                            .filter((a) => dayjs(a.fecha, "DD/MM/YYYY").isSame(selectedDate, 'day'))
                            .map((a) => (
                                <Box
                                    key={a.idAudiencia}
                                    sx={{
                                        border: "1px solid #ddd",
                                        padding: 2,
                                        marginBottom: 2,
                                        borderRadius: "4px",
                                        backgroundColor: "#000815",
                                    }}
                                >
                                    <Typography variant="body1" fontWeight="bold">{a.asunto}</Typography>
                                    <Typography variant="body2">📌 {a.nombreEmpresa}</Typography>
                                    <Typography variant="body2">👤 Atendido por: {a.atendidoPor}</Typography>
                                    <Typography variant="body2">📂 Estado: {a.estado}</Typography>
                                    <Typography variant="body2">📩 Derivado a: {a.derivadoA}</Typography>
                                </Box>
                            ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default Calendario;
