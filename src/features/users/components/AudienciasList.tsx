import { useEffect, useState } from "react";
import { FetchApi } from "../../../api/useAxios";
import  Audiencia  from "../../../Types/Types";
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import BackButton from "../../../shared/components/ButtomBack";
import Search from "../../../shared/components/filter";
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
const AudienciasList = () => {
  const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
  const [filteredAudiencias, setFilteredAudiencias] = useState<Audiencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudiencias = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");

      const response = await FetchApi<Audiencia[]>({
        path: "/Form",
        method: "GET",
        requiresAuth: true,
        token: token || "",
      });

      if (response.code === 200 && response.data) {
        setAudiencias(response.data);
        setFilteredAudiencias(response.data); // Inicializa la lista filtrada con todos los datos
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchAudiencias();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
  
    const filtered = audiencias.filter((audiencia) =>
      audiencia.nombreEmpresa.toLowerCase().includes(lowerQuery) ||
      audiencia.correoElectronico.toLowerCase().includes(lowerQuery) ||
      audiencia.dni.toString().includes(lowerQuery) || // Convertimos DNI a string para buscar
      audiencia.asunto.toLowerCase().includes(lowerQuery)
    );
  
    setFilteredAudiencias(filtered);
  };
  

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista audiencias
      </Typography>
      <Search onSearch={handleSearch} /> {/* Pasamos la función de búsqueda */}
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
                <TableCell><b>Acciones</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAudiencias.map((audiencia) => (
                <TableRow key={audiencia.idAudiencia}>
                  <TableCell>{audiencia.correoElectronico}</TableCell>
                  <TableCell>{new Date(audiencia.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{audiencia.dni}</TableCell>
                  <TableCell>{audiencia.nombreEmpresa}</TableCell>
                  <TableCell>{audiencia?.estado!}</TableCell>
                  <TableCell>{audiencia.atendidoPor}</TableCell>
                  <TableCell>{audiencia.asunto}</TableCell>
                  <TableCell>
                    <Button variant="outlined"
                    color="secondary"
                    startIcon={<EditIcon />} 
                    onClick={() => console.log(`Editar ${audiencia.idAudiencia}`)}
                    >
                      Editar
                    </Button>

                    <Button variant="outlined"
                    color="secondary"
                    startIcon={<PageviewIcon />} 
                    onClick={() => console.log(`Editar ${audiencia.idAudiencia}`)}
                    >
                      Ver
                    </Button>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ padding: 3 }}>
        <BackButton />
      </Box>
    </Box>
  );
};

export default AudienciasList;
