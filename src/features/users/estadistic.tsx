import React, { useState, useEffect } from "react";
import AuthorizedComponent from "../../router/AuthenticateRoute";
import { Box, Typography } from "@mui/material";

const Estadistic: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    //Es necesario Parsear el json para poder obtener los datos 
    useEffect(() => {
        // 1. Corregir la clave a 'user' (minúscula)
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            // 2. Parsear el JSON almacenado
            const userObj = JSON.parse(storedUser);
            
            // 3. Acceder a la propiedad correcta (ajusta 'nombre' según tu modelo de datos)
            setUserName(userObj.nombre); 
            // Si la propiedad se llama 'name' en tu UserProfile, usa userObj.name
        }
    }, []);

    return (
        <Box>
            {userName && (
                <Typography variant="h5">
                    Bienvenido {userName}
                </Typography>
            )}
            
            <AuthorizedComponent requiredRole={true}>
                <div>
                    
                    <p>Este es un componente de vista sencillo de prueba.</p>
                </div>
            </AuthorizedComponent>
            
            <div>
                <h1>no soy admin</h1>    
            </div>
        </Box>
    );
};

export default Estadistic;