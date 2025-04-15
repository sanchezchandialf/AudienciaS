import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FetchApi } from "../../../api/useAxios";
import { useState } from "react";

const NewUser = () => {
    interface FormData {
        nombre: string;
        correo: string;
        clave: string;
    }

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setError('');
        setSuccess('');

        try {
            const response = await FetchApi({
                path: '/Usuario/createuser',
                method: 'POST',
                payload: data,
            });

            if (response.code === 200) {
                setSuccess('Usuario creado correctamente.');
            } else {
                setError(response.data || 'Error al crear el usuario');
            }
        } catch (err) {
            console.error(err);
            setError('Error de conexión o servidor.');
        }
    };

    return (
        <Box>
            <Typography variant="h5" textAlign="center" gutterBottom>
                Nuevo Usuario
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ mt: 3, px: 3 }}
            >
                <Controller
                    name="nombre"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'El usuario es obligatorio' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Usuario"
                            type="text"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!errors.nombre}
                            helperText={errors.nombre?.message}
                        />
                    )}
                />

                <Controller
                    name="correo"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'El correo es obligatorio' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Correo"
                            type="email"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!errors.correo}
                            helperText={errors.correo?.message}
                        />
                    )}
                />

                <Controller
                    name="clave"
                    control={control}
                    defaultValue=""
                    rules={{ required: 'La clave es obligatoria' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Clave"
                            type="password"
                            variant="outlined"
                            fullWidth
                            sx={{ mt: 2 }}
                            error={!!errors.clave}
                            helperText={errors.clave?.message}
                        />
                    )}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                >
                    Agregar Usuario
                </Button>

                {error && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="secondary" sx={{ mt: 2 }}>
                        {success}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default NewUser;
