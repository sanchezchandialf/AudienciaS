import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

const RecupForm: React.FC = () => {
    const [correo, setCorreo] = useState<string>('');
    const { control, handleSubmit } = useForm();

    useEffect(() => {
        const storeduser = localStorage.getItem('user');
        if (storeduser) {
            const userObj = JSON.parse(storeduser);
            const maskedCorreo = userObj.correo.replace(/.(?=.{4}@)/g, '*');
            setCorreo(maskedCorreo);
        }
    }, []);

    const onSubmit = (data: any) => {
        console.log("Correo ingresado:", data.email);
      
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 300, margin: 'auto', mt: 5, p: 3, border: '1px solid #ccc', borderRadius: 2 }}
        >
            <Typography variant="h6" gutterBottom>
                Recuperar Contraseña
            </Typography>

            <Typography sx={{ mb: 2 }}>
                Se enviará un código de verificación a <strong>{correo}</strong> con instrucciones para restablecer tu contraseña. Ingresa tu correo completo:
            </Typography>

            <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'El correo es requerido' }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Correo Electrónico"
                        type="email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                )}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Enviar
            </Button>
        </Box>
    );
};

export default RecupForm;
