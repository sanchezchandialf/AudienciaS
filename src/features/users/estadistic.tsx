import React, { useState, useEffect } from "react";
import AuthorizedComponent from "../../router/AuthenticateRoute";
import { Box, Button, colors, Divider, Typography } from "@mui/material";
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import SettingsIcon from '@mui/icons-material/Settings';
const Estadistic: React.FC = () => {

    const cardsData = [
        {
          icon: <SchoolIcon color="primary" />,
          title: "Gestion de Audiencias",
          description: "Gestiona tus audiencias",
        },
        {
          icon: <GroupIcon color="primary" />,
          title: "Consultar monto trabajadores",
          description: "Conocé la información sobre tu Crédito ANSES vigente",
        },
        {
          icon: <CalendarTodayIcon color="primary" />,
          title: "Mi Calendario",
          description: "Consultá tus fechas disponibles ",
        },
        {
          icon: <WorkHistoryIcon color="primary" />,
          title: "Historial de audiencias",
          description: "Consultá tus audiencias",
        },
        {
          icon: <SupportAgentIcon color="primary" />,
          title: "Mis Informes",
          description: "Genera Reportes, diarios o mensuales sobre tus audiencias",
        },
        {
          icon: <SettingsIcon color="primary" />,
          title: "Mi usuario",
          description: "",
        },
      ];

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
                <Typography variant="h5" textAlign={"center"}>
                    Bienvenido {userName}
                </Typography>
            )}

            <Divider sx={{ backgroundColor: colors.common.white }}></Divider>
            
            <AuthorizedComponent requiredRole={true}>
                
            <Box>
                {cardsData.map((card, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            margin: 2, 
                            padding: 2, 
                            border: '1px solid', 
                            borderColor: colors.grey[300], 
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            '&:hover': {
                                boxShadow: 3,
                            }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {card.icon}
                            <Box sx={{ marginLeft: 2 }}>
                                <Typography>{card.title}</Typography>
                                <Typography>{card.description}</Typography>
                            </Box>
                        </Box>
                        <Button color="secondary" sx={{ fontWeight: 'bold' }}>Ingresar</Button>
                    </Box>
                ))}
            </Box>
            </AuthorizedComponent>
        </Box>
    );
};

export default Estadistic;