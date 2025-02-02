import react from 'react';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useAuth} from '../../context/useAuth';
import { Box } from '@mui/material';
import toast from 'react-hot-toast';

type Props = {};

type FormValues = {
    email: string;
    password: string;
};

const validationSchema = yup.object().shape({
    email: yup.string().email().required("Correo es requerido"),
    password: yup.string().required("Contraseña es requerida"),
});

const LoginPage = (props: Props) => {
  const {loginUser} = useAuth();
  const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({resolver: yupResolver(validationSchema)});
  
  const handleLogin = (form: FormValues) => {
    try {
      loginUser(form.email, form.password);
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesión");
    }
    
  }
  return (
        <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" {...register('password')} />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <button type="submit">Login</button>
        </Box>
    );
};

export default LoginPage;