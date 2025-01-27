import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleredirect = () => {
    navigate("/audiencias");
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
      <Typography variant="h1" color="#c8d29c">
        Audiencias
      </Typography>
      <Button variant="contained" onClick={() => handleredirect()}>
        Solicitar Audiencia
      </Button>
    </Box>
  );
}
