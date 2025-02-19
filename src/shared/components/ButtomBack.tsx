import React from "react";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button 
    
      variant="contained" 
      color="primary" 
      startIcon={<ArrowBackIcon />} 
      onClick={() => navigate(-1)
      }
    >
      Volver
    </Button>
  );
};

export default BackButton;
