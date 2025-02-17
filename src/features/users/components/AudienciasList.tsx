import { useEffect, useState } from "react";
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Alert, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const AudienciasList = () => {
  // creamos un usestate de audiencias donde se van a cargar las audiencias
  const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
  // va a indicar si la api sigue cargando los datos, se inicia en verdadero
  const [loading, setLoading] = useState<boolean>(true);
  // guarda un msj de error
  const [error, setError] = useState<string | null>(null);

  // este useEffect maneja la carga de las audiencias
  useEffect(() => {
    const fetchAudiencias = async () => {
      // Cargamos las audiencias, el mensaje de error arranca en null y el loading en verdadero
      setLoading(true);
      setError(null);

      const token=localStorage.getItem('token')


      const response = await FetchApi<Audiencia[]>({
        path: "/Form",
        method: "GET",
        requiresAuth:true,
        token:token || "", 
        
      });

      if (response.code === 200 && response.data) {
        setAudiencias(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchAudiencias();
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista audiencias
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>Correo</b></TableCell>
                <TableCell><b>Fecha</b></TableCell>
                <TableCell><b>DNI</b></TableCell>
                <TableCell><b>Empresas</b></TableCell>
                <TableCell><b>Estado</b></TableCell>
                <TableCell><b>AtendidoPor</b></TableCell>
                <TableCell><b>Asunto</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audiencias.map((audiencia) => (
                <TableRow key={audiencia.idAudiencia}>
                  <TableCell>{audiencia.correoElectronico}</TableCell>
                  <TableCell>{new Date(audiencia.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{audiencia.dni}</TableCell>
                  <TableCell>{audiencia.nombreEmpresa}</TableCell>
                  <TableCell>{audiencia.idEstado}</TableCell>
                  <TableCell>{audiencia.atendidoPor}</TableCell>
                  <TableCell>{audiencia.asunto}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default AudienciasList;