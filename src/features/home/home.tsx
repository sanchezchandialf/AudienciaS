import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate("/form");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        textAlign: "center",
        gap: 4,
      }}
    >
      <Typography variant="h1" color="secondary">
        Audiencias
      </Typography>
      <Button variant="contained" onClick={() => handleredirect()}>
        Solicitar Audiencia
      </Button>
    </Box>
  );
}
