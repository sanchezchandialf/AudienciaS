import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, CircularProgress, Typography, Box, Paper, Divider } from "@mui/material";
import Audiencia from "../../../Types/Types";
import { FetchApi } from "../../../api/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const ListaPersonalizada: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
    const [filteredAudiencias, setFilteredAudiencias] = useState<Audiencia[]>([]);

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
                setFilteredAudiencias(response.data);
            } else {
                setError(response.message || "Error al cargar los datos.");
            }
            setLoading(false);
        };

        fetchAudiencias();
    }, []);

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        let updatedSelectedItems = [...selectedItems];
        if (checked) {
            updatedSelectedItems.push(name);
        } else {
            updatedSelectedItems = updatedSelectedItems.filter((item) => item !== name);
        }
        setSelectedItems(updatedSelectedItems);
        filterAudiencias(updatedSelectedItems);
    };

    const filterAudiencias = (filters: string[]) => {
        if (filters.length === 0) {
            setFilteredAudiencias(audiencias);
        } else {
            const filtered = audiencias.filter(audiencia => filters.includes(audiencia.estado));
            setFilteredAudiencias(filtered);
        }
    };

    const columns: GridColDef[] = [
        { field: 'idAudiencia', headerName: 'ID', width: 90 },
        { field: 'correoElectronico', headerName: 'Correo Electrónico', width: 200 },
        { field: 'fecha', headerName: 'Fecha', width: 150 },
        { field: 'dni', headerName: 'DNI', width: 150 },
        { field: 'nombreEmpresa', headerName: 'Nombre Empresa', width: 200 },
        { field: 'estado', headerName: 'Estado', width: 150 },
        { field: 'atendidoPor', headerName: 'Atendido Por', width: 200 },
        { field: 'derivadoA', headerName: 'Derivado A', width: 200 },
        { field: 'asunto', headerName: 'Asunto', width: 200 },
    ];

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box padding={3}>
            <Typography variant="h5" gutterBottom>
                Lista de Audiencias
            </Typography>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h6" gutterBottom>
                    Filtrar
                </Typography>
                <Divider />

                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Typography variant="h6">Estado</Typography>
                    
                    <FormControlLabel
                        control={<Checkbox name="Resuelta" onChange={handleCheckboxChange} />}
                        label="Resuelta"
                    />
                    <FormControlLabel
                        control={<Checkbox name="En gestión" onChange={handleCheckboxChange} />}
                        label="En gestión"
                    />
                </Box>
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Typography variant="h6">Atendido Por</Typography>
                    
                    <FormControlLabel
                        control={<Checkbox name="Resuelta" onChange={handleCheckboxChange} />}
                        label="Resuelta"
                    />
                    <FormControlLabel
                        control={<Checkbox name="En gestión" onChange={handleCheckboxChange} />}
                        label="En gestión"
                    />
                </Box>
            </Paper>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <DataGrid
                    rows={filteredAudiencias}
                    columns={columns}
                    paginationModel={{ pageSize: 10, page: 0 }}
                    pageSizeOptions={[10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    getRowId={(row) => row.idAudiencia}
                />
            </Paper>
        </Box>
    );
};

export default ListaPersonalizada;