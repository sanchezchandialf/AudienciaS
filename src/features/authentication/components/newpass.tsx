import React from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { FetchApi } from '../../../api/useAxios';

interface FormData {
  codigo: string;
  claveNueva: string;
}

const RestablecerClave: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const correo = location.state?.correo;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const onSubmit = async (data: FormData) => {
    setError('');
    setSuccess('');

    try {
      const response = await FetchApi({
        path: '/Usuario/newpass',
        method: 'PUT',
        payload: {
          destinatario: correo,
          claveNueva: data.claveNueva,
          codigo: data.codigo,
        },
      });

      if (response.code === 200) {
        setSuccess('Contraseña actualizada correctamente.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data || 'Error al actualizar la contraseña');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión o servidor.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ mt: 5, px: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Restablecer Contraseña
      </Typography>
      <Typography variant="body1">
        Para: <strong>{correo}</strong>
      </Typography>

      <Controller
        name="codigo"
        control={control}
        defaultValue=""
        rules={{ required: 'El código es obligatorio' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Código recibido"
            variant="outlined"
            fullWidth
            sx={{ mt: 3 }}
            error={!!errors.codigo}
            helperText={errors.codigo?.message}
          />
        )}
      />

      <Controller
        name="claveNueva"
        control={control}
        defaultValue=""
        rules={{
          required: 'La nueva contraseña es obligatoria',
          minLength: { value: 6, message: 'Mínimo 6 caracteres' },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Nueva contraseña"
            type="password"
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
            error={!!errors.claveNueva}
            helperText={errors.claveNueva?.message}
          />
        )}
      />

      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Restablecer contraseña
      </Button>
    </Box>
  );
};

export default RestablecerClave;
