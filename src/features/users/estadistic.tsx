import React, { useState, useEffect } from "react";
import AuthorizedComponent from "../../router/AuthenticateRoute";
import { Box, colors, Divider, Typography } from "@mui/material";

const Estadistic: React.FC = () => {
    const [userName, setUserName] = useState<string>('');
    //Es necesario Parsear el json para poder obtener los datos 
    useEffect(() => {
    
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
          
            const userObj = JSON.parse(storedUser);
            
           
            setUserName(userObj.nombre); 
          
        }
    }, []);

    return (
        <Box>
            {userName && (
                <Typography variant="h5">
                    Bienvenido {userName}
                </Typography>
            )}

            <Divider sx={{ backgroundColor: colors.common.white }}></Divider>
            
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