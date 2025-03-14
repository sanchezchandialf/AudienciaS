import React, { useState, useEffect } from "react";
import { Checkbox, FormControlLabel, CircularProgress, Typography, Box, Paper, Divider, Button } from "@mui/material";
import Audiencia from "../../../Types/Types";
import { FetchApi } from "../../../api/useAxios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { number } from "yup";
import generarPDF from "./generadorpdf";

const ListaPersonalizada: React.FC = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
    const [filteredAudiencias, setFilteredAudiencias] = useState<Audiencia[]>([]);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
            const filtered = audiencias.filter(audiencia =>
                filters.includes(audiencia.estado) || filters.includes(audiencia.atendidoPor) // Agregamos atendidoPor al filtro
            );
            setFilteredAudiencias(filtered);
        }
    };


    const handleExportToPDF = () => {
        const asunto = "Lista de Audiencias";
    
        if (selectedRows.length > 0) {
            // Filtrar solo las audiencias seleccionadas
            const selectedData = audiencias.filter(audiencia => selectedRows.includes(audiencia.idAudiencia));
            generarPDF(selectedData, asunto, [0, 5]);
        } else {
            // Si no hay selección, exportar toda la lista
            generarPDF(audiencias, asunto, [0, 5]);
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
                        control={<Checkbox name="Marcos Resico" onChange={handleCheckboxChange} />}
                        label="Marcos Resico"
                    />
                    <FormControlLabel
                        control={<Checkbox name="Karen Kaenel" onChange={handleCheckboxChange} />}
                        label="Karen Kaenel"
                    />
                    <FormControlLabel
                        control={<Checkbox name="Paola Gomez" onChange={handleCheckboxChange} />}
                        label="Paola Gomez"
                    />
                    <FormControlLabel
                        control={<Checkbox name="Edgardo Ruiz Diaz" onChange={handleCheckboxChange} />}
                        label="Edgardo Ruiz Diaz"
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
                    onRowSelectionModelChange={(selection) => setSelectedRows(selection as number[])} 
                />

            </Paper>
            <Box display={"flex"} justifyContent={"flex-end"} marginTop={2}>
            <Button variant="contained" color="primary" onClick={handleExportToPDF}>Generar PDF</Button>
            <Button variant="contained" color="secondary" style={{ marginLeft: '16px' }}>Exportar a Excel</Button>
            </Box>
            
        </Box>
    );
};

export default ListaPersonalizada;