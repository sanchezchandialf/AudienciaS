import React, { useEffect, useState } from "react";
import { FetchApi } from "../../api/useAxios";
import Audiencia from "../../Types/Types";
import { Box, Typography } from "@mui/material";
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
                setError(response.message);
            }
            setLoading(false);
        };

        fetchAudiencias();
    }, []);

    return (
        <Box display="flex" height="100vh" border="1px solid black">
            {/* 🗓️ Columna con el calendario */}
            <Box flex={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" borderRight="1px solid black">
                <Typography component="h1" variant="h4" gutterBottom>
                    Calendario
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                        value={selectedDate}
                        onChange={(newValue) => setSelectedDate(newValue)}
                        slots={{
                            day: (props) => {
                                const { day, selected, ...other } = props;

                             
                                const audiencia = audiencias.find((a) => {
                                    const audienciaDate = dayjs(a.fecha, "DD/MM/YYYY");
                                    return (
                                        audienciaDate.isSame(day, 'day') 
                                     
                                    );
                                });

                                return (
                                    <PickersDay
                                        {...props}
                                        {...other}
                                        sx={{
                                            backgroundColor: audiencia ? 'red' : 'transparent',
                                            color: audiencia ? 'white' : 'black',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: audiencia ? 'bold' : 'normal',
                                            "&:hover": {
                                                backgroundColor: audiencia ? "#d32f2f" : "rgba(0,0,0,0.1)",
                                            },
                                        }}
                                        selected={selected}
                                    />
                                );
                            }
                        }}
                    />
                </LocalizationProvider>
            </Box>

            {/* 📋 Panel derecho con información */}
            <Box flex={1} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6">
                    {selectedDate
                        ? `Reuniones programadas para el ${selectedDate.date()}/${selectedDate.month() + 1}/${selectedDate.year()}`
                        : 'Selecciona una fecha'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Calendario;
