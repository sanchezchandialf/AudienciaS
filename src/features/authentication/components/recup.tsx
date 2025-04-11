import React, { useState} from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import { FetchApi } from '../../../api/useAxios';
import { useNavigate } from 'react-router-dom';
import { BrowserRoutes } from '../../../router/BrowserRoutes';

const RecupForm: React.FC = () => {
    const [correo, setCorreo] = useState<string>('');
    const { control, handleSubmit } = useForm<Auth>(); 
    const navigate= useNavigate(); // hook de navegación
    interface Auth {
        destinatario:string
    }


   

    const onSubmit = async (data: Auth) => { 
        
         try {
              const response = await FetchApi({
                path: "/Email/auth",
                method: "POST",
                requiresAuth: true,
                payload: data,
              });
        
              if ((response.code === 200 || response.code === 201) && response.data) {
                console.log("Formulario enviado con éxito", response.data);
                setCorreo(data.destinatario); // Guardar el correo en el estado
                alert("Se ha enviado un código de verificación a tu correo electrónico.");
                navigate(BrowserRoutes.PASSWORD,{state:{correo:data.destinatario}}); // Redirigir a la pagina de recuperacion 
              } else {
                console.error("Error al enviar el formulario", response);
              }
            } catch (error) {
              console.error("Error en el envío del formulario", error);
            }
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
                name="destinatario"
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
