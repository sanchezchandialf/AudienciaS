import React, { useState, useEffect } from "react";
import AuthorizedComponent from "../../router/AuthenticateRoute";
import { Box, Button, colors, Divider, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";
import cardsData from "../../shared/utilities/ListEstadistic";

const Estadistic: React.FC = () => {
  const navigate = useNavigate(); // hook de navegación
  

  const [userName, setUserName] = useState<string>('');

  // Es necesario parsear el JSON para poder obtener los datos
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
              <Button
                color="secondary"
                sx={{ fontWeight: 'bold' }}
                onClick={() => navigate(card.path)}
              >
                Ingresar
              </Button>
            </Box>
          ))}
        </Box>
      </AuthorizedComponent>
    </Box>
  );
};

export default Estadistic;