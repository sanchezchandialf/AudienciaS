import { useEffect, useState } from "react";
import { FetchApi } from "../../../api/useAxios";
import Audiencia from "../../../Types/Types";
import { Alert, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import BackButton from "../../../shared/components/ButtomBack";
import Search from "../../../shared/components/filter";
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import ViewAudiencias from "./viewAudiencias";
import generarPDF from "./generadorpdf";


const AudienciasList = () => {
  const [audiencias, setAudiencias] = useState<Audiencia[]>([]);
  const [filteredAudiencias, setFilteredAudiencias] = useState<Audiencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedAudiencia, setSelectedAudiencia] = useState<Audiencia | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
        setFilteredAudiencias(response.data);
      } else {
        setError(response.message);
      }
      setLoading(false);
    };

    fetchAudiencias();
  }, []);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
  
    const filtered = audiencias.filter((audiencia) =>
      audiencia.nombreEmpresa.toLowerCase().includes(lowerQuery) ||
      audiencia.correoElectronico.toLowerCase().includes(lowerQuery) ||
      audiencia.dni.toString().includes(lowerQuery) ||
      audiencia.asunto.toLowerCase().includes(lowerQuery)
    );
  
    setFilteredAudiencias(filtered);
  };

  const handleViewAudiencia = (audiencia: Audiencia) => {
    setSelectedAudiencia(audiencia);
    setModalOpen(true);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>
        Lista audiencias
      </Typography>
      <Search onSearch={handleSearch} />
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
                  <TableCell>{audiencia.fecha}</TableCell>
                  <TableCell>{audiencia.dni}</TableCell>
                  <TableCell>{audiencia.nombreEmpresa}</TableCell>
                  <TableCell>{audiencia?.estado!}</TableCell>
                  <TableCell>{audiencia.atendidoPor}</TableCell>
                  <TableCell>{audiencia.asunto}</TableCell>
                    <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => console.log(`Editar ${audiencia.idAudiencia}`)}
                      >
                      Editar
                      </Button>
                      <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      startIcon={<PageviewIcon />}
                      onClick={() => handleViewAudiencia(audiencia)}
                      >
                      Ver
                      </Button>
                    </Box>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 3 }}>
        <BackButton />
        <Button
          variant="contained"
          color="primary"
          onClick={() => generarPDF(filteredAudiencias,"audiencias",[0,5])}
        >
          Generar PDF
        </Button>
      </Box>
      {/* Modal de ViewAudiencias */}
      <ViewAudiencias
        audiencia={selectedAudiencia}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default AudienciasList;
