import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Box, TextField, Typography, CircularProgress, Button, Grid } from '@mui/material';

const EditView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [audiencia, setAudiencia] = useState<Audiencia | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Audiencia>>({});

    useEffect(() => {
        const fetchAudiencia = async () => {
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
                const selectedAudiencia = response.data.find(a => a.idAudiencia === Number(id));
                if (selectedAudiencia) {
                    setAudiencia(selectedAudiencia);
                    setFormData(selectedAudiencia);
                } else {
                    setError("Audiencia no encontrada");
                }
            } else {
                setError(response.message);
            }

            setLoading(false);
        };

        fetchAudiencia();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!formData) return;

        const token = localStorage.getItem("token");
        const response = await FetchApi({
            path: `/audiencias/${id}`,
            method: "PUT",
            requiresAuth: true,
            token: token || "",
            payload: formData,
        });

        if (response.code === 200) {
            alert("Audiencia actualizada con éxito");
            navigate("/audiencias"); // Redirige a la lista de audiencias
        } else {
            setError(response.message);
        }
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}>
            <Typography variant="h5" mb={2}>Editar Audiencia</Typography>
            <Grid container spacing={2}>
                {Object.entries(formData).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box mt={3} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Guardar Cambios
                </Button>
            </Box>
        </Box>
    );
};

export default EditView;
